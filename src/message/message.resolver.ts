import { PubSub } from 'graphql-subscriptions';
import { MessageService } from './message.service';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { CreateMessageInput } from './dto/message.input';
import { asyncFilter } from '../common/async.filter';

@Resolver((of) => Message)
export class MessageResolver {
  constructor(
    @Inject('MessageService')
    private readonly service: MessageService,
    @Inject('PubSub') private readonly pubSub: PubSub,
  ) {}

  @Query((returns) => [Message])
  async getMessagesByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Message[]> {
    return this.service.getMessagesByUserId(userId);
  }

  @Mutation((returns) => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    const newMessage = this.service.create(createMessageInput);
    this.pubSub.publish('messageAdded', { messageAdded: newMessage });

    return newMessage;
  }

  @Subscription((returns) => Message)
  messageAdded(@Args('groupId') groupId: string): any {
    return asyncFilter(
      this.pubSub.asyncIterator('messageAdded'),
      (payload: any) => {
        return payload.messageAdded.group_id === groupId;
      },
    );
  }
}

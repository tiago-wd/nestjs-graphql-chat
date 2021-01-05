import { MessageService } from './message.service';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Message } from './models/message.model';
import { CreateMessageInput } from './dto/message.input';

@Resolver((of) => Message)
export class MessageResolver {
  constructor(
    @Inject('MessageService')
    private readonly service: MessageService,
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
    return this.service.create(createMessageInput);
  }
}

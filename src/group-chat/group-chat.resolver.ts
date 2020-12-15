import { GroupChatService } from './group-chat.service';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GroupChat } from './models/group-chat.model';
import { CreateGroupChatInput } from './dto/group-chat.input';

@Resolver((of) => GroupChat)
export class GroupChatResolver {
  constructor(
    @Inject('GroupChatService')
    private readonly service: GroupChatService,
  ) { }

  @Query((returns) => [GroupChat])
  async groupChats(): Promise<GroupChat[]> {
    console.log(await this.service.findAll());
    return this.service.findAll();
  }

  @Mutation((returns) => GroupChat)
  async createGroupChat(
    @Args('createGroupChatInput') createGroupChatInput: CreateGroupChatInput,
  ): Promise<GroupChat> {
    return this.service.create(createGroupChatInput);
  }
}

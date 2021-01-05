import { GroupService } from './group.service';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Group } from './models/group.model';
import { CreateGroupInput } from './dto/group.input';

@Resolver((of) => Group)
export class GroupResolver {
  constructor(
    @Inject('GroupService')
    private readonly service: GroupService,
  ) {}

  @Query((returns) => [Group])
  async getGroupsByUserId(
    @Args('userId', { type: () => String }) userId: string,
  ): Promise<Group[]> {
    return this.service.getGroupsByUserId(userId);
  }

  @Mutation((returns) => Group)
  async createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.service.create(createGroupInput);
  }
}

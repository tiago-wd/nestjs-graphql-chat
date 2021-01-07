import { Model } from 'mongoose';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group, GroupDocument } from './models/group.model';
import { CreateGroupInput } from './dto/group.input';
import { UserService } from '../user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private model: Model<GroupDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    const group = new this.model(createGroupInput);
    const createdGroup = await group.save();

    await this.userService.addGroupToUser(createdGroup, createGroupInput.owner);

    return await createdGroup.populate('users').execPopulate();
  }

  async getGroupsByUserId(userId: string): Promise<Group[]> {
    return this.model
      .where('user', userId)
      .populate('users', 'messages')
      .exec();
  }

  createGroupInput(userId: string): CreateGroupInput {
    return {
      name: Math.random().toString(36).substr(2),
      owner: userId,
    };
  }
}

import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserInput } from './dto/user.input';
import { Group } from '../group/models/group.model';
import { GroupService } from '../group/group.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @Inject(GroupService)
    private readonly groupService: GroupService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    let createdGroup: Group;
    if (createUserInput.createGroupInput) {
      createdGroup = await this.groupService.create(
        createUserInput.createGroupInput,
      );
    }

    const userInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      groups: createdGroup?._id,
    };

    const user = new this.model(userInput);
    const createdUser = await user.save();

    return await createdUser.populate('groups').execPopulate();
  }

  async addGroupToUser(group: Group, userId: string): Promise<User> {
    return await this.model.findByIdAndUpdate(
      userId,
      { $push: { groups: group } },
      { new: false, useFindAndModify: true },
    );
  }

  async findById(id: string): Promise<User> {
    return this.model.findById(id).populate('groups').exec();
  }

  async findAll(): Promise<User[]> {
    return this.model.find().populate('groups').exec();
  }
}

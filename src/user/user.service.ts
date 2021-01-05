import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserInput } from './dto/user.input';
import { Group, GroupDocument } from '../group/models/group.model';
import { GroupService } from '../group/group.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    @Inject(GroupService)
    private readonly GroupService: GroupService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const createdGroup = await this.GroupService.create(
      createUserInput.createGroupInput,
    );

    const userInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      groups: createdGroup._id,
    };

    const user = new this.model(userInput);
    const createdUser = await user.save();

    return await createdUser.populate('groups').execPopulate();
  }

  async findById(id: string): Promise<User> {
    return this.model.findById(id).populate('groups', 'messages').exec();
  }
}

import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './models/user.model';
import { CreateUserInput } from './dto/user.input';
import { GroupChat, GroupChatDocument } from '../group-chat/models/group-chat.model';
import { GroupChatService } from '../group-chat/group-chat.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(GroupChatService) private readonly groupChatService: GroupChatService,
  ) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    console.log(createUserInput);
    const createdUser = new this.userModel(createUserInput);
    // const createdGroupChat = new this.groupChatModel(createUserInput.createGroupChatInput);
    return (await createdUser.save()).populate("createdGroupChat");
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GroupChat, GroupChatDocument } from './models/group-chat.model';
import { CreateGroupChatInput } from './dto/group-chat.input';

@Injectable()
export class GroupChatService {
  constructor(@InjectModel(GroupChat.name) private groupChatModel: Model<GroupChatDocument>) { }

  async create(createGroupChatInput: CreateGroupChatInput): Promise<GroupChat> {
    console.log(createGroupChatInput);
    const createdGroupChat = new this.groupChatModel(createGroupChatInput);
    return (await createdGroupChat.save()).populate("groupChat");
  }

  async findAll(): Promise<GroupChat[]> {
    return this.groupChatModel.find().exec();
  }
}

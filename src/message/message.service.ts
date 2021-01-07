import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './models/message.model';
import { CreateMessageInput } from './dto/message.input';
import { GroupService } from '../group/group.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private model: Model<MessageDocument>,
    @Inject(GroupService)
    private readonly groupService: GroupService,
  ) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    if (!createMessageInput.group) {
      this.groupService.create(
        this.groupService.createGroupInput(createMessageInput.user),
      );
    }

    const message = new this.model(createMessageInput);
    const createdMessage = await message.save();

    return await createdMessage
      .populate('user')
      .populate('group')
      .execPopulate();
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return this.model.where('user', userId).populate('group').exec();
  }
}

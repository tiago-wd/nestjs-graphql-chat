import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './models/message.model';
import { CreateMessageInput } from './dto/message.input';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private model: Model<MessageDocument>,
  ) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const createdMessage = new this.model(createMessageInput);
    return await createdMessage.save();
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return this.model.where('user', userId).populate('group').exec();
  }
}

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
    const message = new this.model(createMessageInput);
    const createdMessage = await message.save();

    return await createdMessage.populate('user').execPopulate();
  }

  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return this.model.where('user', userId).populate('group').exec();
  }
}

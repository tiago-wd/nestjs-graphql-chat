import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PubSub } from 'graphql-subscriptions';
import { Message, MessageSchema } from './models/message.model';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    forwardRef(() => UserModule),
  ],
  providers: [MessageService, MessageResolver, PubSub],
  exports: [MessageService],
})
export class MessageModule {}

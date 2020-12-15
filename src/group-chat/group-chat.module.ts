import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupChat, GroupChatSchema } from './models/group-chat.model';
import { GroupChatService } from './group-chat.service';
import { GroupChatResolver } from './group-chat.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GroupChat.name, schema: GroupChatSchema },
    ]),
  ],
  providers: [GroupChatService, GroupChatResolver],
  exports: [GroupChatService],
})
export class GroupChatModule {}

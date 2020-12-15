import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.model';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { GroupChatModule } from '../group-chat/group-chat.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    GroupChatModule
  ],
  providers: [UserService, UserResolver],
})
export class UserModule { }

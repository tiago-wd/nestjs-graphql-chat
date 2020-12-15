import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { GroupChat } from '../../group-chat/models/group-chat.model';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  @Prop()
  name: string;

  @Field((type) => String)
  @Prop()
  email: string;

  @Field((type) => GroupChat, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: GroupChat.name })
  groupChat: GroupChat;
}

export const UserSchema = SchemaFactory.createForClass(User);

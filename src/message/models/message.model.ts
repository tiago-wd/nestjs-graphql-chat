import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Group } from '../../group/models/group.model';

export type MessageDocument = Message & Document;

@ObjectType()
@Schema()
export class Message {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  @Prop()
  text: string;

  @Field((type) => User)
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Field((type) => Group, { nullable: true })
  @Prop({ type: Types.ObjectId, ref: 'Group' })
  group: Group;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

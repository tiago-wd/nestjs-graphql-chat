import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Group } from '../../group/models/group.model';
import { Message } from '../../message/models/message.model';

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

  @Field((type) => [Group], { nullable: 'itemsAndList' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groups: Group[];

  @Field((type) => [Message], { nullable: 'itemsAndList' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}

export const UserSchema = SchemaFactory.createForClass(User);

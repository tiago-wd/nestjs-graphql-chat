import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';
import { Message } from '../../message/models/message.model';

export type GroupDocument = Group & Document;

@ObjectType()
@Schema()
export class Group {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  @Prop()
  model: string;

  @Field((type) => String)
  @Prop()
  modelId: string;

  @Field((type) => [User], { nullable: 'itemsAndList' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Field((type) => [Message], { nullable: 'itemsAndList' })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Message[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);

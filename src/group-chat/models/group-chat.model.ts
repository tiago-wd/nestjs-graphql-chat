import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type GroupChatDocument = GroupChat & Document;

@ObjectType()
@Schema()
export class GroupChat {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  @Prop()
  model: string;

  @Field((type) => Number)
  @Prop()
  modelId: number;
}

export const GroupChatSchema = SchemaFactory.createForClass(GroupChat);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type GroupChatDocument = GroupChat & Document;

@ObjectType()
@Schema()
export class GroupChat {
  @Field((type) => String)
  @Prop()
  model: string;

  @Field((type) => Number)
  @Prop()
  id: number;

}

export const GroupChatSchema = SchemaFactory.createForClass(GroupChat);

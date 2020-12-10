import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field((type) => String)
  @Prop()
  name: string;

  @Field((type) => String)
  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

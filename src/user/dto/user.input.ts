import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CreateGroupInput } from '../../group/dto/group.input';

@InputType()
export class CreateUserInput {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  email: string;

  @Field((type) => CreateGroupInput, { nullable: true })
  createGroupInput: CreateGroupInput;
}

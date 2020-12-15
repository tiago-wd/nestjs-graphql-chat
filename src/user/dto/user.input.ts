import { InputType, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
import { CreateGroupChatInput } from '../../group-chat/dto/group-chat.input';

@InputType()
export class CreateUserInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  email: string;

  @Field((type) => CreateGroupChatInput)
  createGroupChatInput: CreateGroupChatInput;
}

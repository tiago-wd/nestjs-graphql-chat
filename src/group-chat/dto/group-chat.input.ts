import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupChatInput {
  @Field((type) => String)
  model: string;

  @Field((type) => Number)
  id: number;
}

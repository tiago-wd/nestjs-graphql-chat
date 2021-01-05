import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  text: string;

  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  groupId: string;
}

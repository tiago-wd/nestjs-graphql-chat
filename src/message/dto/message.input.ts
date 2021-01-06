import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  text: string;

  @Field((type) => String)
  user: string;

  @Field((type) => String, { nullable: true })
  group: string;
}

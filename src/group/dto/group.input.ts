import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field((type) => String, { nullable: true })
  _id?: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  owner: string;

  @Field((type) => [String], { nullable: true })
  users?: [string];
}

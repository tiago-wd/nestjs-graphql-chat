import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field((type) => String, { nullable: true })
  _id: string;

  @Field((type) => String)
  model: string;

  @Field((type) => Number)
  modelId: number;

  @Field((type) => String, { nullable: true })
  userId: string;
}

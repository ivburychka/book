import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindAuthorInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;
}

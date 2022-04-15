import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsString()
  name: string;

  @Field(() => Int, { nullable: true })
  publishYear?: number;

  @Field({ nullable: true, defaultValue: false })
  isLend?: boolean;

  @Field({ nullable: true })
  ownerId?: string;
}

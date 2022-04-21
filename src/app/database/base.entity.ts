import { Field } from '@nestjs/graphql';
import { PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @Field()
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;
}

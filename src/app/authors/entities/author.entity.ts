import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../database/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class Author extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  additional: string;
}

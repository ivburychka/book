import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BaseEntity } from '../database/base.entity';

@Entity()
@ObjectType()
export class Book extends BaseEntity {
  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  publisher?: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  publishYear?: number;

  @Column({ default: false })
  @Field({ defaultValue: false })
  isLend: boolean;

  @Column({ nullable: true })
  @Field({ nullable: true })
  ownerId?: string;

  @ManyToOne(() => User, (u) => u.books, { nullable: true })
  @Field(() => User, { nullable: true })
  owner?: User;
}

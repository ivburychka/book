import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Book } from '../../books/book.entity';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phone?: string;

  @OneToMany(() => Book, (b) => b.owner, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Field(() => [Book], { nullable: 'items' })
  books?: Book[];
}

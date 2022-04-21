import { Field, GraphQLISODateTime, InterfaceType } from '@nestjs/graphql';
import { Column, PrimaryColumn } from 'typeorm';

@InterfaceType()
export class BaseEntity {
  @Field()
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  createAt?: string;

  @Field(() => GraphQLISODateTime, { nullable: true})
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true,
  })
  updateAt?: string;

  @Field({ nullable: true})
  @Column({ type: 'uuid', nullable: true })
  createBy?: string;

  @Field({ nullable: true })
  @Column({ type: 'uuid', nullable: true })
  updateBy?: string;
}

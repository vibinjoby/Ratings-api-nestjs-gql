import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Review } from '../../review/entities/review.entity';

export enum UserType {
  owner = 'owner',
  customer = 'customer',
}

registerEnumType(UserType, {
  name: 'UserType',
});

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Column({ type: 'varchar' })
  @Field(() => UserType)
  userType: UserType;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  @Field(() => [Restaurant], { nullable: true })
  @JoinColumn()
  restaurants?: Restaurant[];

  @OneToMany(() => Review, (review) => review.user)
  @Field(() => [Review], { nullable: true })
  @JoinColumn()
  reviews?: Review[];

  @Field()
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

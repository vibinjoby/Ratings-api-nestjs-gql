import { ObjectType, Field, Int } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum userType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}
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

  @Field()
  @Column()
  userType: userType;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  @Field(() => [Restaurant], { nullable: true })
  @JoinColumn()
  restaurants?: Restaurant[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

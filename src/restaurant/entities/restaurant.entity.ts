import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  restaurantName: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column({ type: 'bigint' })
  contactNumber: number;

  @Field()
  @Column({ type: 'float' })
  averageRatings: number;

  @Field()
  @Column()
  lastEdited: Date;

  @Field()
  @CreateDateColumn({ type: 'date', default: 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.restaurants)
  @Field(() => User)
  user: User;
}

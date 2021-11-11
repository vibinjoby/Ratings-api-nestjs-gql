import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Restaurant } from '../../restaurant/entities/restaurant.entity'
import { User } from '../../user/entities/user.entity'

@Entity()
@ObjectType()
export class Review {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Field()
  @Column()
  ratings: number

  @Field()
  @Column()
  visitDate: Date

  @Field()
  @Column()
  comments: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  ownerReply?: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastEdited?: Date

  @Field()
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  createdAt: Date

  @Field(() => Int)
  @Column()
  userId: number

  @Field(() => Int)
  @Column()
  restaurantId: number

  @ManyToOne(() => User, user => user.reviews)
  @Field(() => User)
  user: User

  @ManyToOne(() => Restaurant, restaurant => restaurant.reviews)
  @Field(() => Restaurant)
  restaurant: Restaurant
}

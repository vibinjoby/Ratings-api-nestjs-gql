import { ObjectType, Field, Int } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Review } from '../../review/entities/review.entity'
import { User } from '../../user/entities/user.entity'

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Field()
  @Column()
  restaurantName: string

  @Field()
  @Column()
  address: string

  @Field()
  @Column({ type: 'bigint' })
  contactNumber: number

  @Field()
  @Column({ type: 'float', default: 0.0 })
  averageRatings: number

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastEdited: Date

  @Field()
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  createdAt: Date

  @Column()
  @Field(() => Int)
  userId: number

  @ManyToOne(() => User, user => user.restaurants, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User

  @OneToMany(() => Review, review => review.restaurant, { onDelete: 'CASCADE' })
  @Field(() => [Review], { nullable: true })
  @JoinColumn()
  reviews?: Review[]
}

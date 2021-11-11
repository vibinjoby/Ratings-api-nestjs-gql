import { ObjectType, Field, Int } from '@nestjs/graphql'
import * as bcrypt from 'bcryptjs'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
@ObjectType()
export class Admin {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
  })
  createdAt: Date

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }
}

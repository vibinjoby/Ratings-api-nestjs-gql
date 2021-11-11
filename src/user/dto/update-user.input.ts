import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'

import { CreateUserInput } from './create-user.input'
import { UserType } from '../entities/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id: number

  @Field()
  @IsEmail()
  email: string

  @Field()
  fullName: string

  @Field()
  password: string

  @Field()
  userType: UserType
}

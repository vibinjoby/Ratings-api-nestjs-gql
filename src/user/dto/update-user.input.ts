import { InputType, Field, Int, PartialType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { CreateUserInput } from './create-user.input'
import { UserType } from '../entities/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int)
  @ApiProperty()
  id: number

  @Field()
  @ApiProperty()
  @IsEmail()
  email: string

  @Field()
  @ApiProperty()
  fullName: string

  @Field()
  @ApiProperty()
  password: string

  @Field()
  @ApiProperty()
  userType: UserType
}

import { InputType, Field } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

import { UserType } from '../entities/user.entity'

@InputType()
export class CreateUserInput {
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

  @Field(() => UserType)
  @ApiProperty()
  userType: UserType
}

import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { UserType } from '../entities/user.entity'

@InputType()
export class LoginInput {
  @Field()
  @ApiProperty()
  email: string

  @Field()
  @ApiProperty()
  password: string

  @Field(() => UserType)
  @ApiProperty()
  userType: UserType
}

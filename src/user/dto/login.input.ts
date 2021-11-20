import { Field, InputType } from '@nestjs/graphql'
import { UserType } from '../entities/user.entity'

@InputType()
export class LoginInput {
  @Field()
  email: string

  @Field()
  password: string

  @Field(() => UserType)
  userType: UserType
}

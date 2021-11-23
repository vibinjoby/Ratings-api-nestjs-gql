import { Field, ObjectType } from '@nestjs/graphql'
import { ApiResponseProperty } from '@nestjs/swagger'

@ObjectType()
export class LoginOutput {
  @Field()
  @ApiResponseProperty()
  token: string
}

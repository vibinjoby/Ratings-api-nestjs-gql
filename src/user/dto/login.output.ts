import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LoginOutput {
  @Field()
  token: string
}

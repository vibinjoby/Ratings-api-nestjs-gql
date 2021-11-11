import { InputType, Field } from '@nestjs/graphql'
import { IsAlpha } from 'class-validator'

@InputType()
export class CreateAdminInput {
  @Field()
  @IsAlpha()
  username: string

  @Field()
  password: string
}

import { InputType, Field, Int, PartialType } from '@nestjs/graphql'

import { CreateReviewInput } from './create-review.input'

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => Int)
  id: number

  @Field()
  ratings: number

  @Field()
  visitDate: Date

  @Field()
  comments: string
}

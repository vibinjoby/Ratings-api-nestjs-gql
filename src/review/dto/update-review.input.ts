import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';

import { CreateReviewInput } from './create-review.input';

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => Int)
  id: number;

  @Field()
  ratings: number;

  @Field()
  @IsDateString()
  visitDate: Date;

  @Field()
  comments: string;
}

import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  ratings: number;

  @Field()
  @IsDate()
  visitDate: Date;

  @Field()
  comments: string;

  @Field(() => Int)
  restaurantId: number;
}

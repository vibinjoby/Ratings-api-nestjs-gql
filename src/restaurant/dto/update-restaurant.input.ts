import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';

import { CreateRestaurantInput } from './create-restaurant.input';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => Int)
  id: number;

  @Field()
  restaurantName: string;

  @Field()
  address: string;

  @Field()
  @IsPhoneNumber('CA')
  contactNumber: number;
}

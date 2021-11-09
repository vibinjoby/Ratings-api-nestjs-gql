import { InputType, Int, Field } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @Field()
  restaurantName: string;

  @Field()
  address: string;

  @Field()
  contactNumber: number;
}

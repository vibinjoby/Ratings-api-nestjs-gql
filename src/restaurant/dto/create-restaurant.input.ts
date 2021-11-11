import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateRestaurantInput {
  @Field()
  restaurantName: string

  @Field()
  address: string

  @Field()
  contactNumber: number
}

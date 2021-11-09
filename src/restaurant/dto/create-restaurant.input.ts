import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

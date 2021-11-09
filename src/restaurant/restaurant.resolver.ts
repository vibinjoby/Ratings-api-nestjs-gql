import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurant' })
  findAll() {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  updateRestaurant(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    return this.restaurantService.update(updateRestaurantInput.id, updateRestaurantInput);
  }

  @Mutation(() => Restaurant)
  removeRestaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.remove(id);
  }
}

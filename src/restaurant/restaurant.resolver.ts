import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/roles.enum';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
    @CurrentUser() user: User,
  ) {
    return this.restaurantService.create(createRestaurantInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Restaurant], { name: 'restaurant' })
  findAll() {
    return this.restaurantService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Restaurant, { name: 'restaurant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  updateRestaurant(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantService.update(
      updateRestaurantInput.id,
      updateRestaurantInput,
    );
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  removeRestaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.remove(id);
  }
}

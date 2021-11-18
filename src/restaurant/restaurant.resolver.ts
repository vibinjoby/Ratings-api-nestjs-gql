import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { connectionFromArraySlice } from 'graphql-relay'

import { RestaurantService } from './restaurant.service'
import { Restaurant } from './entities/restaurant.entity'
import { CreateRestaurantInput } from './dto/create-restaurant.input'
import { UpdateRestaurantInput } from './dto/update-restaurant.input'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { User } from '../user/entities/user.entity'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/roles.enum'
import RestaurantResponse from './entities/RestaurantResponse'
import ConnectionArgs from '../pagination/connection.args'

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
    @CurrentUser() user: User
  ) {
    return this.restaurantService.create(createRestaurantInput, user)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => RestaurantResponse, { name: 'getRestaurants' })
  async findAll(@Args() args: ConnectionArgs) {
    const { limit, offset } = args.pagingParams()
    const [restaurants, count] = await this.restaurantService.findAll(limit, offset)
    const page = connectionFromArraySlice(restaurants, args, { arrayLength: count, sliceStart: offset || 0 })

    return { page, pageData: { count, limit, offset } }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Restaurant, { name: 'getRestaurant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.findOne(id)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Restaurant], { name: 'getOwnedrestaurants' })
  findOwnerRestaurants(@CurrentUser() user: User) {
    return this.restaurantService.findRestaurantsByUserId(user.id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  updateRestaurant(@Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    return this.restaurantService.update(updateRestaurantInput.id, updateRestaurantInput)
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Restaurant)
  removeRestaurant(@Args('id', { type: () => Int }) id: number) {
    return this.restaurantService.remove(id)
  }
}

import { ObjectType } from '@nestjs/graphql'

import relayTypes from '../../pagination/relay.types'
import { Restaurant } from './restaurant.entity'

@ObjectType()
export default class RestaurantResponse extends relayTypes<Restaurant>(Restaurant) {}

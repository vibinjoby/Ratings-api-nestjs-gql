import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { RestaurantService } from './restaurant.service'
import { RestaurantResolver } from './restaurant.resolver'
import { Restaurant } from './entities/restaurant.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  providers: [RestaurantResolver, RestaurantService],
  imports: [TypeOrmModule.forFeature([Restaurant]), AuthModule],
})
export class RestaurantModule {}

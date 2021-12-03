import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateRestaurantInput } from './dto/create-restaurant.input'
import { UpdateRestaurantInput } from './dto/update-restaurant.input'
import { Restaurant } from './entities/restaurant.entity'
import { User } from '../user/entities/user.entity'
import { Review } from '../review/entities/review.entity'

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {}

  create(createRestaurantInput: CreateRestaurantInput, user: User): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(createRestaurantInput)

    newRestaurant.userId = user.id

    return this.restaurantRepository.save(newRestaurant)
  }

  /**
   * 
   * `select coalesce((avg(rw.ratings)),0) as averageRatings,
       rt.id as id, rt.address as address,
        rt.restaurantName as restaurantName 
        from restaurant as rt left join review as rw 
        on rw.restaurantId = rt.id
        group by rt.id,rt.address,rt.restaurantName
        `
   */
  async findAll(limit: number, offset: number): Promise<[Restaurant[], number]> {
    const restaurants = await this.restaurantRepository
      .createQueryBuilder()
      .leftJoin(Review, 'review', 'review.restaurantId = restaurant.id')
      .select('restaurant.restaurantName', 'restaurantName')
      .addSelect('coalesce(AVG(ratings),0)', 'averageRatings')
      .addSelect('restaurant.id', 'id')
      .addSelect('restaurant.address', 'address')
      .addSelect('restaurant.contactNumber', 'contactNumber')
      .groupBy('restaurant.id,restaurant.address,restaurant.restaurantName,restaurant.contactNumber')
      .offset(offset)
      .limit(limit)
      .getRawMany()

    const count = await this.restaurantRepository.count()
    return [restaurants, count]
  }

  async findOne(id: number): Promise<Restaurant> {
    const result = await this.restaurantRepository.findOne(id, { relations: ['reviews', 'reviews.user', 'user'] })
    const averageRatings = await this.restaurantRepository
      .createQueryBuilder()
      .from(Review, 'review')
      .select('coalesce(AVG(ratings),0)', 'averageRatings')
      .getRawOne()

    return { ...result, ...averageRatings }
  }

  async findRestaurantsByUserId(userId: number): Promise<Restaurant[]> {
    const restaurants = await this.restaurantRepository
      .createQueryBuilder()
      .leftJoin(Review, 'review', 'review.restaurantId = restaurant.id and restaurant.userId = :userId', { userId })
      .select('restaurant.restaurantName', 'restaurantName')
      .addSelect('coalesce(AVG(ratings),0)', 'averageRatings')
      .addSelect('restaurant.id', 'id')
      .addSelect('restaurant.address', 'address')
      .addSelect('restaurant.contactNumber', 'contactNumber')
      .groupBy('restaurant.id,restaurant.address,restaurant.restaurantName,restaurant.contactNumber')
      .getRawMany()

    return restaurants
  }

  async update(id: number, updateRestaurantInput: UpdateRestaurantInput): Promise<Partial<Restaurant>> {
    await this.restaurantRepository.update(id, updateRestaurantInput)
    return await this.restaurantRepository.findOne({ id })
  }

  remove(id: number): Promise<DeleteResult> {
    return this.restaurantRepository.delete({ id })
  }
}

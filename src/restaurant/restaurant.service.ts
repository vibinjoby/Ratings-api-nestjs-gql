import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  create(
    createRestaurantInput: CreateRestaurantInput,
    user: User,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(
      createRestaurantInput,
    );

    newRestaurant.userId = user.id;

    return this.restaurantRepository.save(newRestaurant);
  }

  findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne(id);
  }

  update(
    id: number,
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<UpdateResult> {
    return this.restaurantRepository.update(id, updateRestaurantInput);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.restaurantRepository.delete({ id });
  }
}

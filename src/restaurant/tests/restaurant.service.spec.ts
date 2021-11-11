import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { MOCK_USER } from '../../review/tests/factory'
import { Restaurant } from '../entities/restaurant.entity'
import { RestaurantService } from '../restaurant.service'
import { MOCK_RESTAURANT, RestaurantRepositoryFactory } from './factory'

describe('RestaurantService', () => {
  let service: RestaurantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantService,
        {
          provide: getRepositoryToken(Restaurant),
          useValue: RestaurantRepositoryFactory(),
        },
      ],
    }).compile()

    service = module.get<RestaurantService>(RestaurantService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a new restaurant', () => {
    expect(service.create(MOCK_RESTAURANT, MOCK_USER)).toEqual({
      ...MOCK_RESTAURANT,
      id: 100,
    })
  })

  it('should find all restaurants', () => {
    expect(service.findAll()).toEqual([{ ...MOCK_RESTAURANT }])
  })

  it('should find one restaurant', () => {
    expect(service.findOne(100)).toEqual({ ...MOCK_RESTAURANT, id: 100 })
  })
})

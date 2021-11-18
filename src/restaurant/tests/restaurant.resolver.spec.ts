import { Test, TestingModule } from '@nestjs/testing'

import { MOCK_USER } from '../../review/tests/factory'
import { AuthService } from '../../auth/auth.service'
import { RestaurantResolver } from '../restaurant.resolver'
import { RestaurantService } from '../restaurant.service'
import { MOCK_RESTAURANT, RestaurantServiceFactory } from './factory'

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantResolver,
        {
          provide: RestaurantService,
          useFactory: RestaurantServiceFactory,
        },
        {
          provide: AuthService,
          useFactory: () => ({}),
        },
      ],
    }).compile()

    resolver = module.get<RestaurantResolver>(RestaurantResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create a new restaurant', () => {
    expect(resolver.createRestaurant(MOCK_RESTAURANT, MOCK_USER)).toEqual(MOCK_RESTAURANT)
  })

  it('should find one restaurant', () => {
    expect(resolver.findOne(100)).toEqual({ ...MOCK_RESTAURANT, id: 100 })
  })
})

import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantResolver } from './restaurant.resolver';
import { RestaurantService } from './restaurant.service';

describe('RestaurantResolver', () => {
  let resolver: RestaurantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantResolver, RestaurantService],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

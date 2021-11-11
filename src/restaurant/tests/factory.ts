import { MOCK_USER } from '../../review/tests/factory';
import { CreateRestaurantInput } from '../dto/create-restaurant.input';
import { Restaurant } from '../entities/restaurant.entity';

export const RestaurantServiceFactory = () => ({
  create: (_: CreateRestaurantInput) => MOCK_RESTAURANT,
  findAll: () => [
    {
      ...MOCK_RESTAURANT,
    },
  ],
  findOne: (id: number) => ({
    ...MOCK_RESTAURANT,
    id,
  }),
});

export const RestaurantRepositoryFactory = () => ({
  create: (input: CreateRestaurantInput) => ({
    id: 100,
    ...input,
  }),
  find: () => [
    {
      ...MOCK_RESTAURANT,
    },
  ],
  findOne: (id: number) => ({
    ...MOCK_RESTAURANT,
    id,
  }),
  save: () => ({
    ...MOCK_RESTAURANT,
    id: 100,
  }),
});

export const MOCK_RESTAURANT: Restaurant = {
  id: 1,
  restaurantName: '',
  address: '',
  contactNumber: 123,
  averageRatings: 1,
  lastEdited: new Date(),
  createdAt: new Date(),
  userId: 1,
  user: MOCK_USER,
};

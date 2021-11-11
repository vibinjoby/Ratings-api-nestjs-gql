import { User } from '../../user/entities/user.entity';
import { MOCK_USER_DATA } from '../../user/tests/factory';
import { CreateReviewInput } from '../dto/create-review.input';

export const ReviewServiceFactory = () => ({
  create: () => ({
    id: 1,
    ...MOCK_REVIEW,
  }),
  findAll: () => [
    {
      id: 1,
      ...MOCK_REVIEW,
    },
  ],

  findOne: (id: number) => ({
    id,
    ...MOCK_REVIEW,
  }),
});

export const ReviewRepositoryFactory = () => ({
  create: (review: CreateReviewInput) => ({
    id: 1,
    ...review,
  }),
  find: () => [
    {
      ...MOCK_REVIEW,
      id: 1,
    },
  ],
  findOne: (id: number) => ({
    ...MOCK_REVIEW,
    id,
  }),
  save: () => ({
    ...MOCK_REVIEW,
    id: 1,
  }),
});

export const MOCK_REVIEW = {
  restaurantId: 1,
  comments: '',
  ratings: 1,
  visitDate: new Date(),
};

export const MOCK_USER: User = {
  ...MOCK_USER_DATA,
  hashPassword: () => new Promise(() => {}),
  id: 1,
  createdAt: new Date(),
  comparePassword: () => new Promise(() => {}),
};

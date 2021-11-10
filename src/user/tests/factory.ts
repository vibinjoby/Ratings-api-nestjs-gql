import { CreateUserInput } from '../dto/create-user.input';
import { UserType } from '../entities/user.entity';

export const MOCK_USER_DATA = {
  fullName: 'cat',
  email: 'cat@gmail.com',
  userType: UserType.customer,
  password: '1390',
};

export const UserServiceFactory = () => ({
  findAll: () => [
    {
      ...MOCK_USER_DATA,
      id: 1,
    },
  ],
  findOne: (id: number) => ({
    ...MOCK_USER_DATA,
    id,
  }),
  create: (user: CreateUserInput) => ({
    id: 10,
    ...user,
  }),
});

export const UserRepositoryFactory = () => ({
  find: () => [
    {
      ...MOCK_USER_DATA,
      id: 1,
    },
  ],
  findOne: (id: number) => ({
    ...MOCK_USER_DATA,
    id,
  }),
  create: (user: CreateUserInput) => ({
    id: 10,
    ...user,
  }),
  save: () => ({
    ...MOCK_USER_DATA,
    id: 1,
  }),
});

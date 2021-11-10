import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { MOCK_USER_DATA, UserRepositoryFactory } from './factory';

export const repositoryMockFactory = UserRepositoryFactory();

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the users array', () => {
    expect(service.findAll()).toEqual([
      {
        ...MOCK_USER_DATA,
        id: 1,
      },
    ]);
  });

  it('should get one user', () => {
    expect(service.findOne(500)).toEqual({
      ...MOCK_USER_DATA,
      id: {
        relations: ['restaurants', 'reviews'],
        where: [
          {
            id: 500,
          },
          { email: undefined },
        ],
      },
    });
  });

  it('should create new user', () => {
    expect(
      service.create({
        ...MOCK_USER_DATA,
      }),
    ).toEqual({
      ...MOCK_USER_DATA,
      id: 1,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from '../../auth/auth.service';
import { LoginInput } from '../dto/login.input';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';
import { MOCK_USER_DATA, UserServiceFactory } from './factory';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useFactory: UserServiceFactory,
        },
        {
          provide: AuthService,
          useFactory: () => ({ validateUser: (loginInput: LoginInput) => {} }),
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get the users array', () => {
    expect(resolver.findAll()).toEqual([
      {
        ...MOCK_USER_DATA,
        id: 1,
      },
    ]);
  });

  it('should get one user', () => {
    expect(resolver.findOne(500)).toEqual({
      ...MOCK_USER_DATA,
      id: 500,
    });
  });

  it('should create new user', () => {
    expect(
      resolver.createUser({
        ...MOCK_USER_DATA,
      }),
    ).toEqual({
      id: 10,
      ...MOCK_USER_DATA,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing'

import { AuthService } from '../../auth/auth.service'
import { AdminResolver } from '../admin.resolver'
import { AdminService } from '../admin.service'
import { AdminServiceFactory, MOCK_ADMIN } from './factory'

describe('AdminResolver', () => {
  let resolver: AdminResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminResolver,
        {
          provide: AdminService,
          useFactory: AdminServiceFactory,
        },
        {
          provide: AuthService,
          useFactory: () => ({
            validateAdmin: () => new Promise(() => ({ token: 'TOKEN' })),
            generateToken: () => '',
          }),
        },
      ],
    }).compile()

    resolver = module.get<AdminResolver>(AdminResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create new admin', () => {
    expect(resolver.createAdmin({ username: 'admin', password: 'admin' })).toEqual(MOCK_ADMIN)
  })

  it('should validate admin', () => {
    expect(resolver.loginAsAdmin({ username: 'admin', password: 'admin' })).toEqual(
      new Promise(() => ({ token: 'TOKEN' }))
    )
  })
})

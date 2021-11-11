import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { AdminService } from '../admin.service'
import { Admin } from '../entities/admin.entity'
import { AdminRepositoryFactory, MOCK_ADMIN } from './factory'

describe('AdminService', () => {
  let service: AdminService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(Admin),
          useValue: AdminRepositoryFactory(),
        },
      ],
    }).compile()

    service = module.get<AdminService>(AdminService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create new admin', () => {
    expect(service.create({ username: 'admin', password: 'admin' })).toEqual(MOCK_ADMIN)
  })

  it('should find admin user', () => {
    expect(service.findOne(100)).toEqual(new Promise(() => ({ ...MOCK_ADMIN, id: 100 })))
  })
})

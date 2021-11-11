import { Test, TestingModule } from '@nestjs/testing'

import { AuthService } from '../../auth/auth.service'
import { ReviewResolver } from '../review.resolver'
import { ReviewService } from '../review.service'
import { MOCK_REVIEW, MOCK_USER, ReviewServiceFactory } from './factory'

describe('ReviewResolver', () => {
  let resolver: ReviewResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewResolver,
        {
          provide: ReviewService,
          useFactory: ReviewServiceFactory,
        },
        {
          provide: AuthService,
          useFactory: () => ({}),
        },
      ],
    }).compile()

    resolver = module.get<ReviewResolver>(ReviewResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('should create review', () => {
    expect(resolver.createReview(MOCK_REVIEW, MOCK_USER)).toEqual({
      id: 1,
      ...MOCK_REVIEW,
    })
  })

  it('should get all reviews', () => {
    expect(resolver.findAll()).toEqual([{ id: 1, ...MOCK_REVIEW }])
  })

  it('should find one review', () => {
    expect(resolver.findOne(1)).toEqual({
      id: 1,
      ...MOCK_REVIEW,
    })
  })
})

import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { Review } from '../entities/review.entity'
import { ReviewService } from '../review.service'
import { MOCK_REVIEW, MOCK_USER, ReviewRepositoryFactory } from './factory'

describe('ReviewService', () => {
  let service: ReviewService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: ReviewRepositoryFactory(),
        },
      ],
    }).compile()

    service = module.get<ReviewService>(ReviewService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a review', () => {
    expect(service.create(MOCK_REVIEW, MOCK_USER)).toEqual({
      id: 1,
      ...MOCK_REVIEW,
    })
  })

  it('should get all reviews', () => {
    expect(service.findAll()).toEqual([{ id: 1, ...MOCK_REVIEW }])
  })

  it('should find one review', () => {
    expect(service.findOne(1)).toEqual({
      id: 1,
      ...MOCK_REVIEW,
    })
  })
})

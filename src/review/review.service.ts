import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateReviewInput } from './dto/create-review.input'
import { UpdateReviewInput } from './dto/update-review.input'
import { User } from '../user/entities/user.entity'
import { Review } from './entities/review.entity'

@Injectable()
export class ReviewService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>) {}

  create(createReviewInput: CreateReviewInput, user: User): Promise<Review> {
    const newReview = this.reviewRepository.create(createReviewInput)
    newReview.userId = user.id
    return this.reviewRepository.save(newReview)
  }

  async addOwnerReply(ownerReply: string, reviewId: number): Promise<Review> {
    const review = await this.reviewRepository.findOne(reviewId)
    if (!review) throw new NotFoundException(`No reviews with id ${reviewId} found`)

    review.ownerReply = ownerReply
    return this.reviewRepository.save(review)
  }

  findReviewsWithRestaurantId = async (restaurantId: number): Promise<Review[]> => {
    const review = await this.reviewRepository.find({
      where: [{ restaurantId }],
      relations: [
        'restaurant',
        'user',
        'restaurant.reviews',
        'restaurant.reviews.user',
        'user.restaurants',
        'user.reviews',
      ],
    })

    return review
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find({
      relations: [
        'restaurant',
        'user',
        'restaurant.reviews',
        'restaurant.reviews.user',
        'user.restaurants',
        'user.reviews',
      ],
    })
  }

  findOne(id: number): Promise<Review> {
    return this.reviewRepository.findOne(id, {
      relations: [
        'restaurant',
        'user',
        'restaurant.reviews',
        'restaurant.reviews.user',
        'user.restaurants',
        'user.reviews',
      ],
    })
  }

  async update(id: number, updateReviewInput: UpdateReviewInput): Promise<Partial<Review>> {
    await this.reviewRepository.update(id, updateReviewInput)
    return await this.reviewRepository.findOne({ id })
  }

  remove(id: number): Promise<DeleteResult> {
    return this.reviewRepository.delete(id)
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ReviewService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: User,
  ) {
    return this.reviewService.create(createReviewInput, user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Review], { name: 'review' })
  findAll() {
    return this.reviewService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.remove(id);
  }
}

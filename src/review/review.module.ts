import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { Review } from './entities/review.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ReviewResolver, ReviewService],
  imports: [TypeOrmModule.forFeature([Review]), AuthModule],
})
export class ReviewModule {}

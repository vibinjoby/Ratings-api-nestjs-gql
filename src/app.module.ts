import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { RestaurantModule } from './restaurant/restaurant.module'
import { ReviewModule } from './review/review.module'
import { AdminModule } from './admin/admin.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory',
      entities: ['dist/**/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RestaurantModule,
    ReviewModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

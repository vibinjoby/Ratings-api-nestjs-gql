import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { User } from './entities/user.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}

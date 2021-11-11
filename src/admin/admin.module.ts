import { forwardRef, Module } from '@nestjs/common'
import { AdminService } from './admin.service'
import { AdminResolver } from './admin.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './entities/admin.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), forwardRef(() => AuthModule)],
  providers: [AdminResolver, AdminService],
  exports: [AdminService],
})
export class AdminModule {}

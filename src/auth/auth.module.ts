import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { UserModule } from '../user/user.module'
import { GqlAuthGuard } from './gql-auth.guard'
import { AdminModule } from '../admin/admin.module'

@Module({
  imports: [
    forwardRef(() => UserModule),
    AdminModule,
    JwtModule.register({
      secret: process.env.JWT_TOKEN,
      //signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, GqlAuthGuard],
  exports: [AuthService, GqlAuthGuard],
})
export class AuthModule {}

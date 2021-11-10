import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AdminService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInput } from './dto/create-admin.input';
import { AuthService } from '../auth/auth.service';
import { LoginOutput } from '../user/dto/login.output';

@Resolver(() => Admin)
export class AdminResolver {
  constructor(
    private readonly adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') createAdminInput: CreateAdminInput) {
    return this.adminService.create(createAdminInput);
  }

  @Mutation(() => LoginOutput)
  async loginAsAdmin(@Args('data') loginInput: CreateAdminInput) {
    return this.authService.validateAdmin(loginInput);
  }
}

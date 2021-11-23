import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { AuthService } from '../auth/auth.service'
import { CreateUserInput } from './dto/create-user.input'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { User } from './entities/user.entity'
import { UserService } from './user.service'

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Post('createUser')
  @ApiResponse({
    type: LoginOutput,
  })
  @ApiBody({ type: CreateUserInput })
  async createUser(@Body() createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput)
    const token = this.authService.generateToken({ user, isAdmin: false })
    return { token }
  }

  @Get('user/:id')
  @UseGuards(GqlAuthGuard)
  @ApiResponse({ type: User })
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @Post('login')
  @ApiBody({ type: LoginInput })
  async login(@Body() loginInput: LoginInput) {
    return this.authService.validateUser(loginInput)
  }
}

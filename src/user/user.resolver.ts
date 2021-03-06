import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql'
import { Body, Delete, Get, Patch, UseGuards } from '@nestjs/common'

import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { AuthService } from '../auth/auth.service'
import { LoginInput } from './dto/login.input'
import { LoginOutput } from './dto/login.output'
import { GqlAuthGuard } from '../auth/gql-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/roles.enum'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @Mutation(() => LoginOutput)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput)
    const token = this.authService.generateToken({ user, isAdmin: false })
    return { token }
  }

  // Admin protected resolver
  @Get()
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: number) {
    return this.userService.findOne(id)
  }

  // Admin protected resolver
  @Patch('updateUser')
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(@Body() @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput)
  }

  // Admin protected resolver
  @Roles(Role.Admin)
  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  @Delete(':id')
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const result = await this.userService.remove(id)
    return result.affected ?? false
  }

  @Mutation(() => LoginOutput)
  async login(@Args('data') loginInput: LoginInput) {
    return this.authService.validateUser(loginInput)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  @Get('whoAmI')
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return user
  }
}

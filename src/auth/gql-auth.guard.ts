import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

import { AuthService } from './auth.service'
import { ROLES_KEY } from './roles.decorator'
import { Role } from './roles.enum'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private reflector: Reflector) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const req = this.getRequest(context)
    const authHeader = req.headers.authorization as string

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.')
    }
    const [type, token] = authHeader.split(' ')
    if (type !== 'Bearer') {
      throw new BadRequestException(`Authentication type \'Bearer\' required. Found \'${type}\'`)
    }
    const { isValid, user, isAdmin } = await this.authService.validateToken(token)

    // Check for admin protected resolvers
    if (requiredRoles.includes(Role.Admin) && !isAdmin) {
      return false
    }

    if (isValid) {
      req.user = user
      return true
    }
    throw new UnauthorizedException('Token not valid')
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { LoginOutput } from '../user/dto/login.output'
import { LoginInput } from '../user/dto/login.input'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { AdminService } from '../admin/admin.service'
import { CreateAdminInput } from '../admin/dto/create-admin.input'
import { Admin } from '../admin/entities/admin.entity'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService, private adminService: AdminService) {}

  generateToken = ({ user, isAdmin }: { user: any; isAdmin: boolean }) => {
    return this.jwtService.sign({
      name: isAdmin ? user.username : user.fullName,
      sub: user.id,
      userType: user.userType ?? '',
      isAdmin,
    })
  }

  async validateUser({ email, password, userType }: LoginInput): Promise<LoginOutput> {
    const user = await this.userService.findOne(null, email)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    if (await user.comparePassword(password)) {
      if (user.userType !== userType) {
        throw new UnauthorizedException(`${user.userType} cannot login as ${userType}`)
      }
      const token = this.generateToken({ user, isAdmin: false })
      return { token }
    }
    throw new UnauthorizedException('Incorrect credentials')
  }

  async validateAdmin({ username, password }: CreateAdminInput): Promise<LoginOutput> {
    const user = await this.adminService.findOne(null, username)
    if (!user) {
      throw new UnauthorizedException('User not found')
    }
    if (await user.comparePassword(password)) {
      const token = this.generateToken({ user, isAdmin: true })
      return { token }
    }
    throw new UnauthorizedException('Incorrect credentials')
  }

  async validateToken(token: string): Promise<{ isValid: boolean; user?: User | Admin; isAdmin?: boolean }> {
    try {
      const { sub, isAdmin } = this.jwtService.verify(token)
      if (isAdmin)
        return {
          isValid: true,
          user: await this.adminService.findOne(sub),
          isAdmin: true,
        }
      const user = await this.userService.findOne(sub)
      return { user, isValid: true, isAdmin: false }
    } catch (e) {
      return { isValid: false }
    }
  }
}

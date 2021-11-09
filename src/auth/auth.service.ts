import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginOutput } from '../user/dto/login.output';
import { LoginInput } from '../user/dto/login.input';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginInput): Promise<LoginOutput> {
    const user = await this.userService.findOne(null, email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (await user.comparePassword(password)) {
      const token = this.jwtService.sign({
        name: user.fullName,
        sub: user.id,
      });
      return { token };
    }
    throw new UnauthorizedException('Incorrect credentials');
  }

  async validateToken(
    token: string,
  ): Promise<{ isValid: boolean; user?: User }> {
    try {
      const { sub } = this.jwtService.verify(token);
      const user = await this.userService.findOne(sub);
      return { user, isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }
}

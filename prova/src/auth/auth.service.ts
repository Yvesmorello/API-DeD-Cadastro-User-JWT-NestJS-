import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByName(username);
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user.toObject();
        return result;
      }
    }
    throw new UnauthorizedException('Username ou senha incorretos.');
  }

  async login(user: User) {
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

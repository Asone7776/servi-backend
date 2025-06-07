import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { HashingService } from './services/hashing.abstract.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    const match = await this.hashingService.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid Password');
    }
    const { password: _password, ...rest } = user;
    return rest;
  }

  async login(user: User) {
    const { password: _password, ...rest } = user;
    const payload = { sub: user.id, ...rest };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}

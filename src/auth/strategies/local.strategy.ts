import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dto/login.dto.ts';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const loginDto = plainToInstance(LoginDto, { email, password });
    const errors = validateSync(loginDto);
    if (errors.length > 0) {
      const messages = errors.map((error) => {
        return Object.values(error.constraints).join(', ');
      });
      throw new BadRequestException(messages);
    }
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

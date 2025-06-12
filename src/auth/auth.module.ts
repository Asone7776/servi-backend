import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingService } from './services/hashing.abstract.service';
import { BcryptService } from './services/bcrypt.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    LocalStrategy,
    JwtStrategy,
    AuthService,
  ],
  exports: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AuthService,
  ],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@modules/auth/controllers/auth.controller';
import { AuthService } from '@modules/auth/services/auth.service';
import { HashingService } from '@modules/auth/services/hashing.abstract.service';
import { BcryptService } from '@modules/auth/services/bcrypt.service';
import { UsersModule } from '@modules/users/users.module';
import { LocalStrategy } from '@modules/auth/strategies/local.strategy';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

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

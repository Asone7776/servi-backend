import { Module } from '@nestjs/common';
import { UsersService } from '@modules/users/services/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

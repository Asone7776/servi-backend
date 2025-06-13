import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@modules/core/core.module';
import { UsersModule } from '@modules/users/users.module';
import { CarTypeModule } from '@modules/car-type/car-type.module';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, UsersModule, CarTypeModule],
})
export class AppModule {}

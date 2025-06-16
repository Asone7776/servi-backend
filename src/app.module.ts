import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@modules/core/core.module';
import { UsersModule } from '@modules/users/users.module';
import { CarTypeModule } from '@modules/car-type/car-type.module';
import { CarModule } from '@modules/car/car.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CoreModule,
    UsersModule,
    CarTypeModule,
    CarModule,
  ],
})
export class AppModule {}

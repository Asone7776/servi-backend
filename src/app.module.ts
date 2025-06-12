import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';
import { CarTypeModule } from './car-type/car-type.module';

@Module({
  imports: [ConfigModule.forRoot(), CoreModule, UsersModule, CarTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

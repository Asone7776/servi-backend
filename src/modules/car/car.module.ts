import { Module } from '@nestjs/common';
import { CarService } from '@modules/car/services/car.service';
import { CarController } from '@modules/car/controllers/car.controller';

@Module({
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

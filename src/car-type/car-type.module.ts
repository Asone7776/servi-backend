import { Module } from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CarTypeController } from './car-type.controller';

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService],
})
export class CarTypeModule {}

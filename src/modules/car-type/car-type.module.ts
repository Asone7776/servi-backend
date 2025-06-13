import { Module } from '@nestjs/common';
import { CarTypeService } from '@modules/car-type/services/car-type.service';
import { CarTypeController } from '@modules/car-type/controllers/car-type.controller';

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService],
})
export class CarTypeModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CarService } from '@modules/car/services/car.service';
import { CreateCarDto } from '@modules/car/dto/create-car.dto';
import { UpdateCarDto } from '@modules/car/dto/update-car.dto';
import { BaseListDto } from '@shared/dto/base-list.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user';
import { User } from '@prisma/client';

@Controller('api/cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto, @CurrentUser() user: User) {
    return this.carService.create(createCarDto, user);
  }

  @Get()
  findAll(@Query() query: BaseListDto) {
    return this.carService.findAll(query);
  }

  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.carService.remove(+id);
  }
}

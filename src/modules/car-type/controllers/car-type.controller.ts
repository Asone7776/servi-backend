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
import { CarTypeService } from '@modules/car-type/services/car-type.service';
import { CreateCarTypeDto } from '@modules/car-type/dto/create-car-type.dto';
import { UpdateCarTypeDto } from '@modules/car-type/dto/update-car-type.dto';
import { BaseListDto } from '@shared/dto/base-list.dto';

@Controller('car-types')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}

  @Post()
  create(@Body() createCarTypeDto: CreateCarTypeDto) {
    return this.carTypeService.create(createCarTypeDto);
  }

  @Get()
  findAll(@Query() query: BaseListDto) {
    return this.carTypeService.findAll(query);
  }

  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.carTypeService.findOne(+id);
  }

  @Patch('/update/:id')
  update(@Param('id') id: string, @Body() updateCarTypeDto: UpdateCarTypeDto) {
    return this.carTypeService.update(+id, updateCarTypeDto);
  }

  @Delete('/remove/:id')
  remove(@Param('id') id: string) {
    return this.carTypeService.remove(+id);
  }
}

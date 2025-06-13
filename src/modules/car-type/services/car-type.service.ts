import { Injectable, Query } from '@nestjs/common';
import { CreateCarTypeDto } from '@modules/car-type/dto/create-car-type.dto';
import { UpdateCarTypeDto } from '@modules/car-type/dto/update-car-type.dto';
import { PrismaService } from '@prisma/services/prisma.service';
import { PaginationService } from '@prisma/services/pagination.service';
import { BaseListDto } from '@shared/dto/base-list.dto';

@Injectable()
export class CarTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createCarTypeDto: CreateCarTypeDto) {
    return await this.prismaService.carType.create({
      data: {
        type: createCarTypeDto.type,
        translations: {
          create: createCarTypeDto?.translations,
        },
      },
      include: {
        translations: true,
      },
    });
  }

  async findAll(@Query() query: BaseListDto) {
    return await this.paginationService.makePagination('carType', {
      page: query?.page ? Number(query.page) : 1,
      perPage: query.perPage ? Number(query.page) : 10,
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.carType.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        translations: true,
      },
    });
  }

  async update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    let translations = {};
    if (
      updateCarTypeDto.translations &&
      updateCarTypeDto.translations?.length > 0
    ) {
      translations = {
        deleteMany: {},
        create: updateCarTypeDto.translations,
      };
    }
    return await this.prismaService.carType.update({
      where: { id },
      data: {
        type: updateCarTypeDto.type,
        translations,
      },
      include: {
        translations: true,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.carType.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: `Car type ${id} was removed`,
    };
  }
}

import { Injectable, Query } from '@nestjs/common';
import { CreateCarDto } from '@modules/car/dto/create-car.dto';
import { UpdateCarDto } from '@modules/car/dto/update-car.dto';
import { BaseListDto } from '@shared/dto/base-list.dto';
import { PaginationService } from '@prisma/services/pagination.service';
import { PrismaService } from '@prisma/services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createCarDto: CreateCarDto, user: User) {
    return await this.prismaService.car.create({
      data: {
        ...createCarDto,
        user_id: user.id,
      },
      include: {
        car_type: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findAll(@Query() query: BaseListDto) {
    return await this.paginationService.makePagination('car', {
      page: query?.page ? Number(query.page) : 1,
      perPage: query.perPage ? Number(query.page) : 10,
      include: {
        car_type: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.car.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    return await this.prismaService.car.update({
      where: {
        id,
      },
      data: {
        ...updateCarDto,
      },
      include: {
        car_type: {
          include: {
            translations: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.car.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: 'Car removed successfully',
    };
  }
}

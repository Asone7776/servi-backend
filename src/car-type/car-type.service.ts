import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarTypeDto } from './dto/create-car-type.dto';
import { UpdateCarTypeDto } from './dto/update-car-type.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationService } from '../../prisma/pagination.service';

@Injectable()
export class CarTypeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createCarTypeDto: CreateCarTypeDto) {
    try {
      return await this.prismaService.carType.create({
        data: {
          type: createCarTypeDto.type,
          translations: {
            create: createCarTypeDto?.translations,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll() {
    return await this.paginationService.makePagination('carType', {
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.carType.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: number, updateCarTypeDto: UpdateCarTypeDto) {
    return updateCarTypeDto;
  }

  async remove(id: number) {
    try {
      await this.prismaService.carType.delete({
        where: {
          id,
        },
      });
      return {
        success: true,
        message: `Car type ${id} was removed`,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}

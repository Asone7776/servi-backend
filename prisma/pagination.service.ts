import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

export interface PaginationOptions {
  page?: number;
  perPage?: number;
  where?: any;
  orderBy?: any;
  include?: any;
  select?: any;
}

@Injectable()
export class PaginationService {
  constructor(private readonly prisma: PrismaService) {}

  async makePagination<T extends keyof PrismaService>(
    modelName: T,
    options: PaginationOptions,
  ) {
    const {
      page = 1,
      perPage = 10,
      where = {},
      orderBy,
      include,
      select,
    } = options;

    const model = this.prisma[modelName] as any;

    const skip = (page - 1) * perPage;
    const [data, total] = await this.prisma.$transaction([
      model.findMany({
        where,
        orderBy,
        include,
        select,
        skip,
        take: perPage,
      }),
      model.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        lastPage: Math.ceil(total / perPage),
        currentPage: page,
        perPage,
      },
    };
  }
}

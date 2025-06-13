import { Module } from '@nestjs/common';
import { PrismaService } from '@prisma/services/prisma.service';
import { PaginationService } from '@prisma/services/pagination.service';

@Module({
  providers: [PrismaService, PaginationService],
  exports: [PrismaService, PaginationService],
})
export class PrismaModule {}

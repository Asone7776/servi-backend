import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async findOne(email: string) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: {
          email,
        },
      });
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}

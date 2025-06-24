import * as fs from 'node:fs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/services/prisma.service';
import { CreateMediaDto } from '@modules/media/dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(private prismaService: PrismaService) {}

  async upload(media: Express.Multer.File, data: CreateMediaDto) {
    const filename = `${Date.now()}-${media.originalname}`;
    const file_path = `uploads/${filename}`;
    try {
      fs.writeFileSync(file_path, media.buffer);
      return await this.prismaService.media.create({
        data: {
          url: file_path,
          type: media.mimetype,
          size: media.size,
          ...data,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number) {
    const removed_file = await this.prismaService.media.delete({
      where: {
        id,
      },
    });
    try {
      await fs.unlinkSync(removed_file.url);
    } catch (err) {
      throw new BadRequestException(`Failed to delete file: ${err.message}`);
    }
    return {
      success: true,
      message: 'File removed successfully.',
    };
  }
}

import { Injectable, Query } from '@nestjs/common';
import { CreateBannerDto } from '@modules/banner/dto/create-banner.dto';
import { UpdateBannerDto } from '@modules/banner/dto/update-banner.dto';
import { PrismaService } from '@prisma/services/prisma.service';
import { MediaService } from '@modules/media/services/media.service';
import Prisma from '@prisma/client';
import { BaseListDto } from '@shared/dto/base-list.dto';
import { PaginationService } from '@prisma/services/pagination.service';

@Injectable()
export class BannerService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mediaService: MediaService,
    private readonly paginationService: PaginationService,
  ) {}

  async create(createBannerDto: CreateBannerDto, media?: Express.Multer.File) {
    let media_to_upload: Prisma.Media | undefined = undefined;
    if (media) {
      media_to_upload = await this.mediaService.upload(media);
    }
    const count = await this.prismaService.banner.count();
    const created_banner = await this.prismaService.banner.create({
      data: {
        position: count + 1,
        location: createBannerDto.location,
      },
    });
    if (media_to_upload) {
      await this.prismaService.bannerMedia.create({
        data: {
          banner_id: created_banner.id,
          media_id: media_to_upload.id,
        },
      });
    }
    return await this.prismaService.banner.findFirstOrThrow({
      where: {
        id: created_banner.id,
      },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async findAll(@Query() query: BaseListDto) {
    return await this.paginationService.makePagination('banner', {
      page: query?.page ? Number(query.page) : 1,
      perPage: query.perPage ? Number(query.page) : 10,
      orderBy: [
        {
          position: 'asc',
        },
      ],
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.banner.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateBannerDto: UpdateBannerDto,
    media?: Express.Multer.File,
  ) {
    let media_to_upload: Prisma.Media | undefined = undefined;
    if (media) {
      await this.remove_banner_media(id);
      media_to_upload = await this.mediaService.upload(media);
    }
    await this.prismaService.banner.update({
      where: {
        id,
      },
      data: {
        location: updateBannerDto.location,
      },
    });
    if (media_to_upload) {
      await this.prismaService.bannerMedia.create({
        data: {
          banner_id: id,
          media_id: media_to_upload.id,
        },
      });
    }
    return await this.prismaService.banner.findFirstOrThrow({
      where: {
        id: id,
      },
      include: {
        media: {
          include: {
            media: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.remove_banner_media(id);
    await this.prismaService.banner.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: `Successfully removed the banner`,
    };
  }

  async reorder(banners: number[]) {
    const operations = banners.map((id, index: number) => {
      return this.prismaService.banner.update({
        where: {
          id,
        },
        data: {
          position: index + 1,
        },
      });
    });
    await this.prismaService.$transaction(operations);
    return {
      message: 'Successfully reordered',
      success: true,
    };
  }

  private async remove_banner_media(banner_id: number) {
    const medias = await this.prismaService.bannerMedia.findMany({
      where: {
        banner_id,
      },
    });
    for (const media of medias) {
      await this.mediaService.remove(media.media_id);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { BannerService } from '@modules/banner/services/banner.service';
import { CreateBannerDto } from '@modules/banner/dto/create-banner.dto';
import { UpdateBannerDto } from '@modules/banner/dto/update-banner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BaseListDto } from '@shared/dto/base-list.dto';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('media'))
  create(
    @Body() createBannerDto: CreateBannerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|png|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'File size is too big',
        })
        .build(),
    )
    media?: Express.Multer.File,
  ) {
    return this.bannerService.create(createBannerDto, media);
  }

  @Get()
  findAll(@Query() query: BaseListDto) {
    return this.bannerService.findAll(query);
  }

  @Get('/show/:id')
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('media'))
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|png|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'File size is too big',
        })
        .build(),
    )
    media?: Express.Multer.File,
  ) {
    return this.bannerService.update(+id, updateBannerDto, media);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.bannerService.remove(+id);
  }
}

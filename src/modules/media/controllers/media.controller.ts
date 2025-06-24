import {
  Body,
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { MediaService } from '@modules/media/services/media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMediaDto } from '@modules/media/dto/create-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('media'))
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|png|jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024,
          message: 'Size is too big',
        })
        .build(),
    )
    media: Express.Multer.File,
    @Body() data: CreateMediaDto,
  ) {
    return this.mediaService.upload(media, data);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}

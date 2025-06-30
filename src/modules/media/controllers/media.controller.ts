import {
  Controller,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MediaService } from '@modules/media/services/media.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload/single')
  @UseInterceptors(FileInterceptor('media'))
  upload(
    @UploadedFile()
    media: Express.Multer.File,
  ) {
    return this.mediaService.upload(media);
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(+id);
  }
}

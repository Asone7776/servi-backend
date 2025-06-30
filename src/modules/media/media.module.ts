import { Module } from '@nestjs/common';
import { MediaService } from '@modules/media/services/media.service';
import { MediaController } from '@modules/media/controllers/media.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}

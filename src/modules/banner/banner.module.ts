import { Module } from '@nestjs/common';
import { BannerService } from '@modules/banner/services/banner.service';
import { BannerController } from '@modules/banner/controllers/banner.controller';
import { MediaModule } from '@modules/media/media.module';

@Module({
  imports: [MediaModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}

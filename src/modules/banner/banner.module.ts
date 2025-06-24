import { Module } from '@nestjs/common';
import { BannerService } from '@modules/banner/services/banner.service';
import { BannerController } from '@modules/banner/controllers/banner.controller';

@Module({
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}

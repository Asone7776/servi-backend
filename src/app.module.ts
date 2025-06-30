import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@modules/core/core.module';
import { UsersModule } from '@modules/users/users.module';
import { CarTypeModule } from '@modules/car-type/car-type.module';
import { CarModule } from '@modules/car/car.module';
import { BannerModule } from '@modules/banner/banner.module';
import { MediaModule } from '@modules/media/media.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { cwd } from 'node:process';

console.log(join(cwd(), 'uploads'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot(),
    CoreModule,
    MediaModule,
    UsersModule,
    CarTypeModule,
    CarModule,
    BannerModule,
  ],
})
export class AppModule {}

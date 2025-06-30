import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

enum BannerLocations {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
}

export class CreateBannerDto {
  @IsPositive()
  @Type(() => Number)
  position?: number;
  @IsOptional()
  is_main?: boolean;
  @IsOptional()
  location?: BannerLocations;
}

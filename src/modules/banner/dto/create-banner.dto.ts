import { IsEnum, IsOptional } from 'class-validator';

enum BannerLocations {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
}

export class CreateBannerDto {
  @IsOptional()
  @IsEnum(BannerLocations)
  location?: BannerLocations;
}

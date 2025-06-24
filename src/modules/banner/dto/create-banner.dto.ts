import { IsPositive } from 'class-validator';

enum BannerLocations {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
}

export class CreateBannerDto {
  @IsPositive()
  position?: number;
  media?: File;
  is_main?: boolean;
  location?: BannerLocations;
}

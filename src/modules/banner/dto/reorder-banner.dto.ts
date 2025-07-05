import { ArrayNotEmpty, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderBannerDto {
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  banner_ids: number[];
}

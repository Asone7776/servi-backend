import { IsEnum, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export enum MediaEntities {
  banner = 'banner',
  user = 'user',
  company = 'company',
}

export class CreateMediaDto {
  @IsNotEmpty()
  @IsEnum(MediaEntities)
  entity: MediaEntities;
  @IsNotEmpty()
  @Type(() => Number)
  entity_id: number;
}

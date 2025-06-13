import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TranslateItemDto } from '@shared/dto/translate.dto';

export class CreateCarTypeDto {
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({
    each: true,
  })
  @Type(() => TranslateItemDto)
  translations?: TranslateItemDto[];
}

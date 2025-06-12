import { IsEnum, IsNotEmpty } from 'class-validator';
import { Languages } from '../types/translations';

export class TranslateItemDto {
  @IsEnum(Languages)
  lang: Languages;

  @IsNotEmpty()
  title: string;
}

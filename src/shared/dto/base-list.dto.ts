import { IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseListDto {
  @ApiProperty({
    required: false,
    example: 1,
    description: 'Страница',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number;
  @ApiProperty({
    required: false,
    example: 10,
    description: 'Кол-во на страницу',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  perPage?: number;
  @ApiProperty({
    required: false,
    example: 0,
    description: 'С пагинацией или без (0 - оставить,1 - убрать)',
  })
  @IsOptional()
  @Type(() => Number)
  raw?: number;
}

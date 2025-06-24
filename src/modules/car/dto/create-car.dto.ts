import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  car_type_id: number;
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(10)
  license_plate: string;
}

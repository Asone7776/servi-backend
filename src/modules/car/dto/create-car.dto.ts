import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  car_type_id: number;
  @IsNotEmpty()
  license_plate: string;
}

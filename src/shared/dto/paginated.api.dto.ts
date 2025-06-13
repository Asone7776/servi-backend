import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export default class ApiPaginatedDto<T> {
  @ApiProperty({
    example: {
      total: 2,
      lastPage: 1,
      page: 1,
      perPage: 10,
      prev: null,
      next: null,
    },
  })
  meta: {
    total: number;
    lastPage: number;
    page: number;
    perPage: number;
    prev?: string;
    next?: string;
  };
  data: T[];
}

import { Get, Controller } from '@nestjs/common';
import { ReferenceService } from '@modules/reference/services/reference.service';

@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @Get()
  getAll() {
    return this.referenceService.getAll();
  }
}

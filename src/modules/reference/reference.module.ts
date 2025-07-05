import { Module } from '@nestjs/common';
import { ReferenceController } from '@modules/reference/controllers/reference.controller';
import { ReferenceService } from '@modules/reference/services/reference.service';

@Module({
  imports: [],
  controllers: [ReferenceController],
  providers: [ReferenceService],
  exports: [ReferenceService],
})
export class ReferenceModule {}

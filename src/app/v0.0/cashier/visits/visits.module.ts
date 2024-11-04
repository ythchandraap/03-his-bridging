import { Module } from '@nestjs/common';

import { VisitsServices } from './index/visits.service';
import { VisitsController } from './index/visits.controller';
import { VisitsMergeServices } from './merge/visits-merge.service';
import { VisitsMergeController } from './merge/visits-merge.controller';

@Module({
  imports: [],
  controllers: [VisitsController, VisitsMergeController],
  providers: [VisitsServices, VisitsMergeServices],
})
export class DetailModule {}

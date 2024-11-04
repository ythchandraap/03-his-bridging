import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { VisitsMergeServices } from './visits-merge.service';

@Controller('apps-internal/v0.0/cashier/visits/merge')
export class VisitsMergeController {
  constructor(private readonly VisitsMergeService: VisitsMergeServices) {}

  @Get(':visit_id/:receipt_id')
  @HttpCode(HttpStatus.OK)
  async get(
    @Headers() headers: any,
    @Param('visit_id') visit_id: string,
    @Param('receipt_id') receipt_id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const combine = { ...headers, visit_id, receipt_id };
    return await this.VisitsMergeService.getVisitsMerged(combine);
  }

  @Patch(':visit_id/:receipt_id')
  @HttpCode(HttpStatus.OK)
  async turnOff(
    @Headers() headers: any,
    @Body() body: any,
    @Param('visit_id') visit_id: string,
    @Param('receipt_id') receipt_id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const combine = { ...headers, visit_id, receipt_id };
    return await this.VisitsMergeService.doVisitMerge(combine, body);
  }
}

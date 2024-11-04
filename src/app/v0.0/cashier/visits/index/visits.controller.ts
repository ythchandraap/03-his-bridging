import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { VisitsServices } from './visits.service';

@Controller('apps-internal/v0.0/cashier/visits')
export class VisitsController {
  constructor(private readonly VisitsService: VisitsServices) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.VisitsService.getAllVisits(headers);
  }
  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async getSpesific(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.VisitsService.getAllVisits(headers);
  }
}

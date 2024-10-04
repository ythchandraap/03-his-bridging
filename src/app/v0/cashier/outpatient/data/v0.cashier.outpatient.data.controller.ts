import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { V0CashierOutpatientDataServices } from './v0.cashier.outpatient.data.service';

@Controller('apps-internal/v0/cashier/outpatient/data')
export class V0CashierOutpatientDataController {
  constructor(
    private readonly V0CashierOutpatientDataService: V0CashierOutpatientDataServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.V0CashierOutpatientDataService.getCashierOutpatient(
      headers,
    );
  }
}

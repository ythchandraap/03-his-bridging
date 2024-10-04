import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
} from '@nestjs/common';
import { V0CashierOutpatientSeparateReceiptServices } from './v0.cashier.outpatient.separate-receipt.service';

@Controller('apps-internal/v0/cashier/outpatient/separate-receipt')
export class V0CashierOutpatientSeparateReceiptController {
  constructor(
    private readonly V0CashierOutpatientSeparateReceiptService: V0CashierOutpatientSeparateReceiptServices,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.V0CashierOutpatientSeparateReceiptService.getCashierOutpatient(
      headers,
    );
  }
}

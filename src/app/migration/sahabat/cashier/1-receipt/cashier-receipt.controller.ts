import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { CashierReceiptServices } from './cashier-receipt.service';

@Controller('apps-internal/migration/sahabat/cashier/1-receipt')
export class CashierReceiptController {
  constructor(private readonly CashierReceiptService: CashierReceiptServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    @Body() body: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.CashierReceiptService.migrationCashierReceipt(
      headers,
      body,
    );
  }
}

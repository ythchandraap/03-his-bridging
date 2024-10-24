import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { ProcessCashierReceiptDto } from './dto/process-cashier-receipt.dto';

@Injectable()
export class CashierReceiptServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async migrationCashierReceipt(headers: any, body: any) {
    return await ProcessCashierReceiptDto(headers, body, this.connection);
  }
}

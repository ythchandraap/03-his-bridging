import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { SeparateReceiptInOutpatient } from './dto/separate-receipt-in-outpatient.dto';

@Injectable()
export class V0CashierOutpatientSeparateReceiptServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getCashierOutpatient(headers: any) {
    return await SeparateReceiptInOutpatient(headers, this.connection);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetCashierOutpatient } from './dto/get-cashier-outpatient.dto';

@Injectable()
export class V0CashierOutpatientDataServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getCashierOutpatient(headers: any) {
    return await GetCashierOutpatient(headers, this.connection);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { ProcessGoodsTransactionsDto } from './dto/process-goods-transactions.dto';

@Injectable()
export class GoodsTransactionsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async migrationGoodsTransactions(headers: any, body: any) {
    return await ProcessGoodsTransactionsDto(headers, body, this.connection);
  }
}

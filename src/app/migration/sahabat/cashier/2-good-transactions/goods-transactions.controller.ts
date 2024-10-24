import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { GoodsTransactionsServices } from './goods-transactions.service';

@Controller('apps-internal/migration/sahabat/cashier/2-goods-transactions')
export class GoodsTransactionsController {
  constructor(
    private readonly GoodsTransactionsService: GoodsTransactionsServices,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    @Body() body: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.GoodsTransactionsService.migrationGoodsTransactions(
      headers,
      body,
    );
  }
}

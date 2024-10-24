import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CashierReceiptController } from './1-receipt/cashier-receipt.controller';
import { CashierReceiptServices } from './1-receipt/cashier-receipt.service';
import { GoodsTransactionsController } from './2-good-transactions/goods-transactions.controller';
import { GoodsTransactionsServices } from './2-good-transactions/goods-transactions.service';

@Module({
  imports: [DbModule],
  controllers: [CashierReceiptController, GoodsTransactionsController],
  providers: [CashierReceiptServices, GoodsTransactionsServices],
})
export class MigrationCashierModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

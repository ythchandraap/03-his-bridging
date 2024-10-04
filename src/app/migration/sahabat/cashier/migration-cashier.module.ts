import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { CashierReceiptServices } from './receipt/cashier-receipt.service';
import { CashierReceiptController } from './receipt/cashier-receipt.controller';

@Module({
  imports: [DbModule],
  controllers: [CashierReceiptController],
  providers: [CashierReceiptServices],
})
export class MigrationCashierModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

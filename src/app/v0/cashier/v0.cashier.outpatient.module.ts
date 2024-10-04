import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { V0CashierOutpatientDataController } from './outpatient/data/v0.cashier.outpatient.data.controller';
import { V0CashierOutpatientDataServices } from './outpatient/data/v0.cashier.outpatient.data.service';
import { V0CashierOutpatientSeparateReceiptController } from './outpatient/separate-receipt/v0.cashier.outpatient.separate-receipt.controller';
import { V0CashierOutpatientSeparateReceiptServices } from './outpatient/separate-receipt/v0.cashier.outpatient.separate-receipt.service';

@Module({
  imports: [DbModule],
  controllers: [
    V0CashierOutpatientDataController,
    V0CashierOutpatientSeparateReceiptController,
  ],
  providers: [
    V0CashierOutpatientDataServices,
    V0CashierOutpatientSeparateReceiptServices,
  ],
})
export class V0CashierOutpatient {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

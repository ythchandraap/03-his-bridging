import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { V0CashierOutpatient } from './cashier/v0.cashier.outpatient.module';
import { V0AttributeStatus } from './attribute/v0.attribute.status.module';
import { HRModules } from './hr/v0.hr.module';

@Module({
  imports: [DbModule, V0CashierOutpatient, V0AttributeStatus, HRModules],
})
export class V0Module {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

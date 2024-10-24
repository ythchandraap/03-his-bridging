import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FinanceModule } from './detail/finance.module';

@Module({
  imports: [DbModule, FinanceModule],
})
export class ReportModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

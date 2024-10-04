import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { MigrationCashierModule } from './cashier/migration-cashier.module';

@Module({
  imports: [DbModule, MigrationCashierModule],
})
export class SahabatModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

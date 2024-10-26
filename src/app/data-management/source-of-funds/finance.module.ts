import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FinanceSuccessfullyClaimedServices } from './successfully-claimed/successfully-claimed.service';
import { FinanceSuccessfullyClaimedController } from './successfully-claimed/successfully-claimed.controller';

@Module({
  imports: [DbModule],
  controllers: [FinanceSuccessfullyClaimedController],
  providers: [FinanceSuccessfullyClaimedServices],
})
export class FinanceModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

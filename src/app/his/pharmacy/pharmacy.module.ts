import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PharmacyStockEstimateServices } from './stock-estimate/stock-estimate.service';
import { PharmacyStockEstimateController } from './stock-estimate/stock-estimate.controller';

@Module({
  imports: [DbModule],
  controllers: [PharmacyStockEstimateController],
  providers: [PharmacyStockEstimateServices],
})
export class PharmacyModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

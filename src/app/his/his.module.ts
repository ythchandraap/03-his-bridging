import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';

@Module({
  imports: [DbModule, PharmacyModule],
})
export class HISModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

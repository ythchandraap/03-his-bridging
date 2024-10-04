import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { SahabatModule } from './sahabat/sahabat.module';

@Module({
  imports: [DbModule, SahabatModule],
})
export class MigrationModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

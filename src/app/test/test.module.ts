import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TestServices } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [DbModule],
  controllers: [TestController],
  providers: [TestServices],
})
export class TestModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [DbModule, TaskModule],
})
export class ActivityModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

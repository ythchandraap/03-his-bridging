import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { TaskReportServices } from './report/report.service';
import { TaskReportController } from './report/report.controller';

@Module({
  imports: [DbModule],
  controllers: [TaskReportController],
  providers: [TaskReportServices],
})
export class TaskModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

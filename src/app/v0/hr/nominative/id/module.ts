import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { HRIdUpdateLeaveController } from './update-leave/controller';
import { HRIdUpdateLeaveServices } from './update-leave/services';
import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';

@Module({
  imports: [DbModule],
  controllers: [HRIdUpdateLeaveController],
  providers: [HRIdUpdateLeaveServices],
})
export class HRIdModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkAuthMiddleware).forRoutes(HRIdUpdateLeaveController);
  }
}

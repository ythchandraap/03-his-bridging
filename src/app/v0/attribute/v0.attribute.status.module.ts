import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { V0AttributeStatusServices } from './status/v0.attribute.status.service';
import { V0AttributeStatusController } from './status/v0.attribute.status.controller';
import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';

@Module({
  imports: [DbModule],
  controllers: [V0AttributeStatusController],
  providers: [V0AttributeStatusServices],
})
export class V0AttributeStatus {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

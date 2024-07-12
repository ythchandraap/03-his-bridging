import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ListCheckUpService } from './list-check-up.service';
import { ListCheckUpController } from './list-check-up.controller';
import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ListCheckUpController],
  providers: [ListCheckUpService],
})
export class ListCheckUpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  }
}

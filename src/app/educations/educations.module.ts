import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { EducationsServices } from './educations.service';
import { EducationsController } from './educations.controller';

@Module({
  imports: [DbModule],
  controllers: [EducationsController],
  providers: [EducationsServices],
})
export class EducationsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

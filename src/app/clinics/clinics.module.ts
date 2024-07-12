import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
} from '@nestjs/common';
import { ClinicsServices } from './clinics.service';
import { ClinicsController } from './clinics.controller';
// import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ClinicsController],
  providers: [ClinicsServices],
})
// implements NestModule
export class ClinicsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

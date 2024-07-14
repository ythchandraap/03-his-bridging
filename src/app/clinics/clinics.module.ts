import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ClinicsServices } from './clinics.service';
import { ClinicsController } from './clinics.controller';

@Module({
  imports: [DbModule],
  controllers: [ClinicsController],
  providers: [ClinicsServices],
})
export class ClinicsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

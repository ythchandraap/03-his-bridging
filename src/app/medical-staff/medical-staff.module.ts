import {
  // MiddlewareConsumer,
  Module,
  // NestModule,
} from '@nestjs/common';
import { MedicalStaffServices } from './medical-staff.service';
import { MedicalStaffController } from './medical-staff.controller';
// import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [MedicalStaffController],
  providers: [MedicalStaffServices],
})
// implements NestModule
export class ClinicsModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

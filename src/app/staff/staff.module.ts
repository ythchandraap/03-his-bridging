import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AppointmentClinicsController } from './clinics/appointment.clinics.controller';
import { AppointmentClinicsServices } from './clinics/appointment.clinics.service';

@Module({
  imports: [DbModule],
  controllers: [AppointmentClinicsController],
  providers: [AppointmentClinicsServices],
})
export class StaffModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AppointmentPaymentsMethodController } from './payments-method/appointment.payments-method.controller';
import { AppointmentClinicsController } from './clinics/appointment.clinics.controller';
import { AppointmentClinicsServices } from './clinics/appointment.clinics.service';
import { AppointmentMedicalStaffScheduleServices } from './medical-staff-schedule/appointment.medical-staff-schedule.service';
import { AppointmentMedicalStaffScheduleController } from './medical-staff-schedule/appointment.medical-staff-schedule.controller';
import { AppointmentPaymentsMethodServices } from './payments-method/appointment.payments-method.service';
import { AppointmentMedicalRecordController } from './medical-record/appointment.medical-record.controller';
import { AppointmentMedicalRecordServices } from './medical-record/appointment.medical-record.service';

@Module({
  imports: [DbModule],
  controllers: [
    AppointmentPaymentsMethodController,
    AppointmentClinicsController,
    AppointmentMedicalStaffScheduleController,
    AppointmentMedicalRecordController,
  ],
  providers: [
    AppointmentClinicsServices,
    AppointmentMedicalStaffScheduleServices,
    AppointmentPaymentsMethodServices,
    AppointmentMedicalRecordServices,
  ],
})
export class AppointmentModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

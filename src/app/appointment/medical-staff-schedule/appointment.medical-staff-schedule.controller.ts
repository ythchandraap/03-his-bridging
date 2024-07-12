import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { AppointmentMedicalStaffScheduleServices } from './appointment.medical-staff-schedule.service';

@Controller('api/apps-internal/appointment/medical-staff-schedule')
export class AppointmentMedicalStaffScheduleController {
  constructor(
    private readonly AppointmentMedicalStaffScheduleService: AppointmentMedicalStaffScheduleServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(@Headers() headers: any) {
    return await this.AppointmentMedicalStaffScheduleService.getMedicalStaffSchedule(
      headers,
    );
  }
}

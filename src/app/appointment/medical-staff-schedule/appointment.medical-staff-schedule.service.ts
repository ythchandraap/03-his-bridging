import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetMedicalStaffScheduleDto } from './dto/get-medical-staff-schedule.dto';

@Injectable()
export class AppointmentMedicalStaffScheduleServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getMedicalStaffSchedule(headers: any) {
    return await GetMedicalStaffScheduleDto(headers, this.connection);
  }
}

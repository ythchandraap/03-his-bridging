import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetMedicalRecord } from './dto/get-medical-record.dto';

@Injectable()
export class AppointmentMedicalRecordServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getMedicalRecord(headers: any) {
    return await GetMedicalRecord(headers, this.connection);
  }
}

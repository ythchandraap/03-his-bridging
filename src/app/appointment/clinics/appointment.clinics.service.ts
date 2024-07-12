import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetClinics } from './dto/get-clinics.dto';

@Injectable()
export class AppointmentClinicsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getClinics(headers: any) {
    return await GetClinics(headers, this.connection);
  }
}

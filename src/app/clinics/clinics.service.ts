import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetClinicsDto } from './dto/get-clinics.dto';

@Injectable()
export class ClinicsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getClinics(param: any, headers: any, request: any) {
    return await GetClinicsDto(param, headers, request, this.connection);
  }
}

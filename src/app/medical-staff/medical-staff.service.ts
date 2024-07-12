import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { SearchMedicalStaffDto } from './dto/search-medical-staff.dto';

@Injectable()
export class MedicalStaffServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async searchMedicalStaff(param: any, headers: any, request: any) {
    return await SearchMedicalStaffDto(
      param,
      headers,
      request,
      this.connection,
    );
  }
}

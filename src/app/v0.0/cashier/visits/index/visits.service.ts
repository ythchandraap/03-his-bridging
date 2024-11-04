import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { getAllVisits } from './dto/get-all-visits.dto';

@Injectable()
export class VisitsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getAllVisits(headers: any) {
    return await getAllVisits(headers, this.connection);
  }
}

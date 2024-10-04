import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetStatusDto } from './dto/get-status.dto';

@Injectable()
export class V0AttributeStatusServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getStatus(headers: any) {
    return await GetStatusDto(headers, this.connection);
  }
}

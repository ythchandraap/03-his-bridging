import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { SuccessfullyClaimedDto } from './dto/successfully-claimed.dto';

@Injectable()
export class FinanceSuccessfullyClaimedServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async successfullyClaimed(headers: any, body: any) {
    return await SuccessfullyClaimedDto(headers, body, this.connection);
  }
}

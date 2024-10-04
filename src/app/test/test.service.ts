import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { Test } from './dto/test.dto';

@Injectable()
export class TestServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async goTest(headers: any) {
    return await Test(headers, this.connection);
  }
}

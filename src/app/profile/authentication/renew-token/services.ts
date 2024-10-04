import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { RenewToken } from './dto/renew-token.dto';

@Injectable()
export class AuthRenewTokenServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async RenewToken(headers: any, body: any) {
    return await RenewToken(headers, body, this.connection);
  }
}

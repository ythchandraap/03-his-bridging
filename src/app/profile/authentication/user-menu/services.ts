import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetUserMenu } from './dto/get-user-menu';

@Injectable()
export class AuthUserMenuServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async GetUserMenu(headers: any, body: any, { request }: { request: any }) {
    return await GetUserMenu(headers, body, { request }, this.connection);
  }
}

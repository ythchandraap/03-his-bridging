import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { AuthEncrypted } from './dto/encrypted.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthEncryptedServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    private readonly jwtService: JwtService,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async AuthEncrypted(headers: any, body: any) {
    return await AuthEncrypted(headers, body, this.jwtService);
  }
}

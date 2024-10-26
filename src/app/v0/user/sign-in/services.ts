import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { SignIn } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class V0UserSignInServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    private readonly jwtService: JwtService,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async signIn(headers: any, body: any) {
    return await SignIn(headers, body, this.jwtService, this.connection);
  }
}

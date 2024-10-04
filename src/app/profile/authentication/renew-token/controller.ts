import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { AuthRenewTokenServices } from './services';

@Controller('apps-internal/profile/auth/renew-token')
export class AuthRenewTokenController {
  constructor(private readonly AuthRenewTokenService: AuthRenewTokenServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(@Headers() headers: any, @Body() body: any) {
    return await this.AuthRenewTokenService.RenewToken(headers, body);
  }
}

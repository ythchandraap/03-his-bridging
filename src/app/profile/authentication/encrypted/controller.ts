import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { AuthEncryptedServices } from './services';
// import { AuthSignInServices } from './services';

@Controller('apps-internal/profile/auth/encrypted')
export class AuthEncryptedController {
  constructor(private readonly AuthEncryptedService: AuthEncryptedServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(@Headers() headers: any, @Body() body: any) {
    return await this.AuthEncryptedService.AuthEncrypted(headers, body);
  }
}

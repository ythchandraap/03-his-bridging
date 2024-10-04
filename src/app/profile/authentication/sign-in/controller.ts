import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { AuthSignInServices } from './services';

@Controller('apps-internal/profile/auth/sign-in')
export class AuthSignInController {
  constructor(private readonly AuthSignInService: AuthSignInServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(@Headers() headers: any, @Body() body: any) {
    return await this.AuthSignInService.signIn(headers, body);
  }
}

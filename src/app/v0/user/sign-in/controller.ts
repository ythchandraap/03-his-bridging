import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { V0UserSignInServices } from './services';

@Controller('apps-internal/v0/user/sign-in')
export class V0UserSignInController {
  constructor(private readonly V0UserSignInService: V0UserSignInServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(@Headers() headers: any, @Body() body: any) {
    return await this.V0UserSignInService.signIn(headers, body);
  }
}

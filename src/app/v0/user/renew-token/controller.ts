import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { V0UserRenewTokenServices } from './services';

@Controller('apps-internal/v0/user/renew-token')
export class V0UserRenewTokenController {
  constructor(
    private readonly V0UserRenewTokenService: V0UserRenewTokenServices,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(@Headers() headers: any, @Body() body: any) {
    return await this.V0UserRenewTokenService.RenewToken(headers, body);
  }
}

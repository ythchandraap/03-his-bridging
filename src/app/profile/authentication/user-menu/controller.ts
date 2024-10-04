import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { AuthUserMenuServices } from './services';
import { Request } from 'express';

@Controller('apps-internal/profile/auth/user-menu')
export class AuthUserMenuController {
  constructor(private readonly AuthUserMenuService: AuthUserMenuServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authSIgnIn(
    @Headers() headers: any,
    @Body() body: any,
    @Req() request: Request,
  ) {
    return await this.AuthUserMenuService.GetUserMenu(headers, body, {
      request,
    });
  }
}

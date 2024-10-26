import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
  Patch,
  Param,
  Get,
} from '@nestjs/common';
import { WalletDetailServices } from './create.service';

@Controller('apps-internal/v0.0/wallet/detail')
export class WalletDetailController {
  constructor(private readonly WalletDetailService: WalletDetailServices) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async get(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.WalletDetailService.getAllData(headers);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    @Body() body: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.WalletDetailService.createWallet(headers, body);
  }

  @Patch(':uuid')
  @HttpCode(HttpStatus.OK)
  async patch(
    @Headers() headers: any,
    @Body() body: any,
    @Param('uuid') uuid: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    const combine = { ...body, uuid };
    return await this.WalletDetailService.editWallet(headers, combine);
  }
}
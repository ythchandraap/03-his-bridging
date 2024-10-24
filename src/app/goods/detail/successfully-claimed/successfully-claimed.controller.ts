import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Body,
} from '@nestjs/common';
import { FinanceSuccessfullyClaimedServices } from './successfully-claimed.service';

@Controller('apps-internal/report/finance/successfully-claimed')
export class FinanceSuccessfullyClaimedController {
  constructor(
    private readonly FinanceSuccessfullyClaimedService: FinanceSuccessfullyClaimedServices,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    @Body() body: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.FinanceSuccessfullyClaimedService.successfullyClaimed(
      headers,
      body,
    );
  }
}

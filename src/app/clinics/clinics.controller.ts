import {
  Controller,
  // Post,
  HttpCode,
  HttpStatus,
  Headers,
  Req,
  // Res,
  // Param,
  Get,
  Query,
} from '@nestjs/common';
import { ClinicsServices } from './clinics.service';

@Controller('api/apps-internal/clinics')
export class ClinicsController {
  constructor(private readonly ClinicsService: ClinicsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Query() params: any,
    @Headers() headers: any,
    @Req() request: Request,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.getClinics(params, headers, request);
  }
}

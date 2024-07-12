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
import { MedicalStaffServices } from './medical-staff.service';

@Controller('api/apps-internal/medical-staff')
export class MedicalStaffController {
  constructor(private readonly ClinicsService: MedicalStaffServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Query() params: any,
    @Headers() headers: any,
    @Req() request: Request,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.searchMedicalStaff(
      params,
      headers,
      request,
    );
  }
}

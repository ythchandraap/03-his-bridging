import {
  Controller,
  // Post,
  HttpCode,
  HttpStatus,
  Headers,
  // Res,
  // Param,
  Get,
} from '@nestjs/common';
import { AppointmentClinicsServices } from './appointment.clinics.service';

@Controller('api/apps-internal/appointment/clinics')
export class AppointmentClinicsController {
  constructor(
    private readonly AppointmentClinicsService: AppointmentClinicsServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.AppointmentClinicsService.getClinics(headers);
  }
}

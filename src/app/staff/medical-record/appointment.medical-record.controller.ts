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
import { AppointmentMedicalRecordServices } from './appointment.medical-record.service';

@Controller('api/apps-internal/appointment/medical-record')
export class AppointmentMedicalRecordController {
  constructor(
    private readonly AppointmentMedicalRecordService: AppointmentMedicalRecordServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.AppointmentMedicalRecordService.getMedicalRecord(headers);
  }
}

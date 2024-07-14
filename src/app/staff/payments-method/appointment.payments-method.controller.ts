import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { AppointmentPaymentsMethodServices } from './appointment.payments-method.service';

@Controller('api/apps-internal/appointment/payments-method')
export class AppointmentPaymentsMethodController {
  constructor(
    private readonly AppointmentPaymentsMethodService: AppointmentPaymentsMethodServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.AppointmentPaymentsMethodService.getPaymentsMethod(
      headers,
    );
  }
}

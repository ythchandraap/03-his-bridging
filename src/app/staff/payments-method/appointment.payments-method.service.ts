import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetPaymentsMethodDto } from './dto/get-payment-method.dto';

@Injectable()
export class AppointmentPaymentsMethodServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getPaymentsMethod(headers: any) {
    return await GetPaymentsMethodDto(headers, this.connection);
  }
}

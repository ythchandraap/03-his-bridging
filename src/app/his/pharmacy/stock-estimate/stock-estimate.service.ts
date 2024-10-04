import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { EstimatingDto } from './dto/estimating.dto';

@Injectable()
export class PharmacyStockEstimateServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async estimating(headers: any) {
    return await EstimatingDto(headers, this.connection);
  }
}

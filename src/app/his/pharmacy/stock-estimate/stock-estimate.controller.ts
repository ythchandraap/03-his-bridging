import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
} from '@nestjs/common';
import { PharmacyStockEstimateServices } from './stock-estimate.service';

@Controller('apps-internal/his/pharmacy/stock-estimate')
export class PharmacyStockEstimateController {
  constructor(
    private readonly PharmacyStockEstimateService: PharmacyStockEstimateServices,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.PharmacyStockEstimateService.estimating(headers);
  }
}

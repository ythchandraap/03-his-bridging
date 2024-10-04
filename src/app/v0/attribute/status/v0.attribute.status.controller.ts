import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { V0AttributeStatusServices } from './v0.attribute.status.service';

@Controller('apps-internal/v0/attribute/status')
export class V0AttributeStatusController {
  constructor(
    private readonly V0AttributeStatusService: V0AttributeStatusServices,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.V0AttributeStatusService.getStatus(headers);
  }
}

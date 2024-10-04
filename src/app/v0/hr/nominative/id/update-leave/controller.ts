import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  Param,
} from '@nestjs/common';
import { HRIdUpdateLeaveServices } from './services';

@Controller('apps-internal/v0/hr/nominative')
export class HRIdUpdateLeaveController {
  constructor(
    private readonly HRIdUpdateLeaveService: HRIdUpdateLeaveServices,
  ) {}

  @Post(':id/update-leave')
  @HttpCode(HttpStatus.OK)
  async updateLeave(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.HRIdUpdateLeaveService.updateLeave(headers, id);
  }

  @Post(':id/update-leave/:detail')
  @HttpCode(HttpStatus.OK)
  async updateLeaveSpesific(
    @Headers() headers: any,
    @Param('id') id: string,
    @Param('detail') detail: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.HRIdUpdateLeaveService.updateLeaveSpesific(
      headers,
      id,
      detail,
    );
  }
}

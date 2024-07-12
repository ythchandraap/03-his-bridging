import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Headers,
  Req,
  // Res,
  Param,
} from '@nestjs/common';
import { ListCheckUpService } from './list-check-up.service';

@Controller('api/apps-internal/lab/list-check-up')
export class ListCheckUpController {
  constructor(private readonly listCheckUpService: ListCheckUpService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Param('s') param: any,
    @Headers() headers: any,
    @Req() request: Request,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.listCheckUpService.getListData(param, headers, request);
  }
}

import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
} from '@nestjs/common';
import { TestServices } from './test.service';

@Controller('apps-internal/test')
export class TestController {
  constructor(private readonly TestService: TestServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.TestService.goTest(headers);
  }
}

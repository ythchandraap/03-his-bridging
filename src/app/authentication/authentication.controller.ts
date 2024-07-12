import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  Req,
  Res,
} from '@nestjs/common';
import { EnterUsername } from './dto/enter-username.dto';
import { AuthenticationService } from './authentication.service';

@Controller('api/apps-internal/authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() enterUsername: EnterUsername,
    @Headers() headers: any,
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authenticationService.enterUsername(
      enterUsername,
      headers,
      request,
      response,
    );
  }
}

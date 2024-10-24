import { Controller, HttpCode, HttpStatus, Headers, Get } from '@nestjs/common';
import { V0UserProfileServices } from './v0.user.profile.service';

@Controller('apps-internal/v0/attribute/status')
export class V0UserProfileController {
  constructor(private readonly V0UserProfileService: V0UserProfileServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.V0UserProfileService.getStatus(headers);
  }
}

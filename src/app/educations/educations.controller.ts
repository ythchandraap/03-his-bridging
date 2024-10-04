import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Get,
  Post,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EducationsServices } from './educations.service';

@Controller('api/apps-internal/educations')
export class EducationsController {
  constructor(private readonly EducationsService: EducationsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.EducationsService.getEducations(headers);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.EducationsService.getEducation(headers, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async patchClinic(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.EducationsService.patchEducation(headers, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async switcher(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.EducationsService.switcherEducation(headers, id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.EducationsService.addEducation(headers);
  }
}

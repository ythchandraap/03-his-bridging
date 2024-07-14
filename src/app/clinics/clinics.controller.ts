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
import { ClinicsServices } from './clinics.service';

@Controller('api/apps-internal/clinics')
export class ClinicsController {
  constructor(private readonly ClinicsService: ClinicsServices) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async get(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.getClinics(headers);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.getClinic(headers, id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async patchClinic(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.patchClinic(headers, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async switcher(
    @Headers() headers: any,
    @Param('id') id: string,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.switcherClinic(headers, id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(
    @Headers() headers: any,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.ClinicsService.addClinic(headers);
  }
}

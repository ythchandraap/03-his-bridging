import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetClinics } from './dto/get-clinics.dto';
import { AddClinic } from './dto/add-clinics.dto';
import { GetClinic } from './dto/get-clinic.dto';
import { SwitcherClinic } from './dto/switcher-clinic.dto';
import { PatchClinic } from './dto/patch-clinic.dto';

@Injectable()
export class ClinicsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getClinics(headers: any) {
    return await GetClinics(headers, this.connection);
  }

  async getClinic(headers: any, id: any) {
    return await GetClinic(headers, id, this.connection);
  }

  async switcherClinic(headers: any, id: any) {
    return await SwitcherClinic(headers, id, this.connection);
  }

  async patchClinic(headers: any, id: any) {
    return await PatchClinic(headers, id, this.connection);
  }

  async addClinic(headers: any) {
    return await AddClinic(headers, this.connection);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { GetEducation } from './dto/get-education.dto';
import { GetEducations } from './dto/get-educations.dto';
import { SwitcherEducation } from './dto/switcher-education.dto';
import { PatchEducation } from './dto/patch-education.dto';
import { AddEducation } from './dto/add-education.dto';

@Injectable()
export class EducationsServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getEducations(headers: any) {
    return await GetEducations(headers, this.connection);
  }

  async getEducation(headers: any, id: any) {
    return await GetEducation(headers, id, this.connection);
  }

  async switcherEducation(headers: any, id: any) {
    return await SwitcherEducation(headers, id, this.connection);
  }

  async patchEducation(headers: any, id: any) {
    return await PatchEducation(headers, id, this.connection);
  }

  async addEducation(headers: any) {
    return await AddEducation(headers, this.connection);
  }
}

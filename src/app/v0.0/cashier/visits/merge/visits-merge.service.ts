import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { getVisitsMerged } from './dto/get-visits-merged.dto';
import { doVisitMerge } from './dto/do-visit-merge';

@Injectable()
export class VisitsMergeServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getVisitsMerged(headers: any) {
    return await getVisitsMerged(headers, this.connection);
  }

  async doVisitMerge(headers: any, body: any) {
    return await doVisitMerge(headers, body, this.connection);
  }
}

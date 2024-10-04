import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { TaskReporting } from './dto/task-reporting.dto';

@Injectable()
export class TaskReportServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async taskReporting(headers: any, photos) {
    return await TaskReporting(headers, photos, this.connection);
  }
}

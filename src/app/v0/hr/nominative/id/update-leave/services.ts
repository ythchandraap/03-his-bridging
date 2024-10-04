import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { UpdateLeave } from './dto/update-leave.dto';
import { UpdateLeaveSpesific } from './dto/update-leave-spesific.dto';

@Injectable()
export class HRIdUpdateLeaveServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async updateLeave(headers: any, id: string) {
    return await UpdateLeave(headers, id, this.connection);
  }
  async updateLeaveSpesific(headers: any, id: string, detail: string) {
    return await UpdateLeaveSpesific(headers, id, detail, this.connection);
  }
}

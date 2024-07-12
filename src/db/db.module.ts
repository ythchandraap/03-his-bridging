import { Module } from '@nestjs/common';
import { Pool } from 'pg';

// # DATABASE_URL="postgres://postgres:postgres5432@192.168.150.33:5432/lims2"
const dbProvider: any = {
  provide: 'PG_CONNECTION',
  useValue: new Pool({
    user: 'postgres',
    host: '192.168.150.33',
    database: 'lims2',
    password: 'postgres5432',
    port: 5432,
  }),
};
@Module({ providers: [dbProvider], exports: [dbProvider] })
export class DbModule {}

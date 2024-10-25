import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider: any = {
  provide: 'PG_CONNECTION',
  useValue: new Pool({
    user: process.env.DATABASE_USER_LIS,
    host: process.env.DATABASE_HOST_LIS,
    database: process.env.DATABASE_NAME_LIS,
    password: process.env.DATABASE_PASSWORD_LIS,
    port: process.env.DATABASE_PASSWORD_LIS,
  }),
};
@Module({ providers: [dbProvider], exports: [dbProvider] })
export class DbModule {}

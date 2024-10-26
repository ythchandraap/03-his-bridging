import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { FinanceModule } from './source-of-funds/finance.module';

@Module({
  imports: [DbModule, FinanceModule],
})
export class DataManagementModule {}

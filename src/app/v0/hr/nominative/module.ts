import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { HRIdModule } from './id/module';

@Module({
  imports: [DbModule, HRIdModule],
  controllers: [],
  providers: [],
})
export class HRModule {}

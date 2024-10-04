import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { HRModule } from './nominative/module';

@Module({
  imports: [DbModule, HRModule],
})
export class HRModules {}

import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DetailModule } from './detail/detail.module';

@Module({
  imports: [DbModule, DetailModule],
})
export class WalletModule {}

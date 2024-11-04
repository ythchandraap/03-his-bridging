import { Module } from '@nestjs/common';
import { DetailModule } from './unit/visits.module';

@Module({
  imports: [DetailModule],
})
export class WalletModule {}

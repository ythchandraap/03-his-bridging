import { Module } from '@nestjs/common';
import { DetailModule } from './visits/visits.module';

@Module({
  imports: [DetailModule],
})
export class WalletModule {}

import { Module } from '@nestjs/common';
import { DetailModule } from './detail/detail.module';

@Module({
  imports: [DetailModule],
})
export class WalletModule {}

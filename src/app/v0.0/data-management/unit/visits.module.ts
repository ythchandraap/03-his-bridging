import { Module } from '@nestjs/common';

import { WalletDetailServices } from './index/create.service';
import { WalletDetailController } from './index/create.controller';

@Module({
  imports: [],
  controllers: [WalletDetailController],
  providers: [WalletDetailServices],
})
export class DetailModule {}

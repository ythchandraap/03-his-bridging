import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { WalletDetailServices } from './index/create.service';
import { WalletDetailController } from './index/create.controller';

@Module({
  imports: [DbModule],
  controllers: [WalletDetailController],
  providers: [WalletDetailServices],
})
export class DetailModule {}

import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { createWalletDto } from './dto/create-wallet.dto';
import { editWalletDto } from './dto/edit-wallet.dto';
import { getAllVisits } from './dto/get-all-visits.dto';
import { getWallet } from './dto/get-wallet.dto';
import { turnOffWalletDto } from './dto/turn-off-wallet.dto';
import { turnOnWalletDto } from './dto/turn-on-wallet.dto';

@Injectable()
export class WalletDetailServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getAllVisits(headers: any) {
    return await getAllVisits(headers, this.connection);
  }
  async getWallet(headers: any) {
    return await getWallet(headers, this.connection);
  }

  async createWallet(headers: any, body: any) {
    return await createWalletDto(headers, body, this.connection);
  }

  async editWallet(headers: any, body: any) {
    return await editWalletDto(headers, body, this.connection);
  }

  async turnOffWallet(headers: any, body: any) {
    return await turnOffWalletDto(headers, body, this.connection);
  }

  async turnOnWallet(headers: any, body: any) {
    return await turnOnWalletDto(headers, body, this.connection);
  }
}

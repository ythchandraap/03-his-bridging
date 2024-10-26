import { Injectable } from '@nestjs/common';
import { InjectClient } from 'nest-mysql';
import { Pool } from 'mysql2';
import { createWalletDto } from './dto/create-wallet.dto';
import { editWalletDto } from './dto/edit-wallet.dto';
import { getAllWallet } from './dto/get-all-wallet.dto';

@Injectable()
export class WalletDetailServices {
  constructor(
    @InjectClient() private readonly connection: Pool,
    // @Inject('PG_CONNECTION')
    // private readonly connectionPg: any,
  ) {}

  async getAllData(headers: any) {
    return await getAllWallet(headers, this.connection);
  }

  async createWallet(headers: any, body: any) {
    return await createWalletDto(headers, body, this.connection);
  }

  async editWallet(headers: any, body: any) {
    return await editWalletDto(headers, body, this.connection);
  }
}

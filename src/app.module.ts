import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from 'nest-mysql';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from './app/v0.0/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MysqlModule.forRootAsync({
      useFactory: () => ({
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER,
        port: process.env.DATABASE_PORT,
      }),
    }),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

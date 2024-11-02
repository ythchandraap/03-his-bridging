import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsGateway } from './socket.io/notifications/notifications.gateway';
import { MysqlModule } from 'nest-mysql';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
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
    DbModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule {}

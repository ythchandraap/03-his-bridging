import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsGateway } from './socket.io/notifications/notifications.gateway';
import { MysqlModule } from 'nest-mysql';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { V0Module } from './app/v0/v0.module';
import { ProfileModule } from './app/profile/profile.module';
import { TestModule } from './app/test/test.module';
import { HISModule } from './app/his/his.module';
import { ReportModule } from './app/report/report.module';
import { MigrationModule } from './app/migration/migration.module';
import { ActivityModule } from './app/activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    V0Module,
    HISModule,
    ReportModule,
    MigrationModule,
    ActivityModule,
    MysqlModule.forRootAsync({
      useFactory: () => ({
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER,
        port: parseInt(process.env.DATABASE_PORT),
      }),
    }),
    DbModule,
    ProfileModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule {}

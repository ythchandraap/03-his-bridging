import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './app/recipe/recipe.module';
import { NotificationsGateway } from './socket.io/notifications/notifications.gateway';
import { MysqlModule } from 'nest-mysql';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { ListCheckUpModule } from './app/lab/list-check-up/list-check-up.module';
import { AuthenticationModule } from './app/authentication/authentication.module';
import { AppointmentModule } from './app/appointment/appointment.module';
import { ClinicsModule } from './app/clinics/clinics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RecipeModule,
    AuthenticationModule,
    ListCheckUpModule,
    ClinicsModule,
    AppointmentModule,
    DbModule,
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
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule {}

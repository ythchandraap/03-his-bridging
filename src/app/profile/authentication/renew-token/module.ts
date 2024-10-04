import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { SECRET } from 'utility/constanst';
import { AuthRenewTokenServices } from './services';
import { AuthRenewTokenController } from './controller';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthRenewTokenController],
  providers: [AuthRenewTokenServices],
})
export class AuthRenewTokenModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

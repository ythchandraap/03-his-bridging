import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { SECRET } from 'utility/constanst';
import { AuthSignInController } from './controller';
import { AuthSignInServices } from './services';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthSignInController],
  providers: [AuthSignInServices],
})
export class AuthSignInModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}
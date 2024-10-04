import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { SECRET } from 'utility/constanst';
import { AuthEncryptedServices } from './services';
import { AuthEncryptedController } from './controller';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthEncryptedController],
  providers: [AuthEncryptedServices],
})
export class AuthEncryptedModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

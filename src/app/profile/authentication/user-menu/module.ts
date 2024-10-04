import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { SECRET } from 'utility/constanst';
import { AuthUserMenuServices } from './services';
import { AuthUserMenuController } from './controller';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthUserMenuController],
  providers: [AuthUserMenuServices],
})
export class AuthUserMenuModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

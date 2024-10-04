import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AuthSignInModule } from './authentication/sign-in/module';
import { AuthRenewTokenModule } from './authentication/renew-token/module';
import { AuthEncryptedModule } from './authentication/encrypted/module';
import { AuthUserMenuModule } from './authentication/user-menu/module';
import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';
import { AuthUserMenuController } from './authentication/user-menu/controller';

@Module({
  imports: [
    DbModule,
    AuthSignInModule,
    AuthRenewTokenModule,
    AuthEncryptedModule,
    AuthUserMenuModule,
  ],
})
export class ProfileModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(checkAuthMiddleware).forRoutes(AuthUserMenuController);
  }
}

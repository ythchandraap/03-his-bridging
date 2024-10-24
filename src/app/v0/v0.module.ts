import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { V0CashierOutpatient } from './cashier/v0.cashier.outpatient.module';
import { V0AttributeStatus } from './attribute/v0.attribute.status.module';
import { HRModules } from './hr/v0.hr.module';
import { V0UserProfile } from './user/v0.user.profile.module';
import { V0UserSignInModule } from './user/sign-in/module';
import { V0UserRenewTokenModule } from './user/renew-token/module';

@Module({
  imports: [
    DbModule,
    V0CashierOutpatient,
    V0AttributeStatus,
    HRModules,
    V0UserProfile,
    V0UserRenewTokenModule,
  ],
})
export class V0Module {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

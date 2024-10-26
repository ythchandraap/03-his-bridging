import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { V0UserProfileServices } from './profile/v0.user.profile.service';
import { V0UserProfileController } from './profile/v0.user.profile.controller';
import { V0UserSignInModule } from './sign-in/module';

@Module({
  imports: [DbModule, V0UserSignInModule],
  controllers: [V0UserProfileController],
  providers: [V0UserProfileServices],
})
export class V0UserProfile {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(V0AttributeStatusController);
  // }
}

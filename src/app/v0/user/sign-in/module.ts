import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DbModule } from 'src/db/db.module';
import { SECRET } from 'utility/constanst';
import { V0UserSignInController } from './controller';
import { V0UserSignInServices } from './services';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [V0UserSignInController],
  providers: [V0UserSignInServices],
})
export class V0UserSignInModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(checkAuthMiddleware).forRoutes(ListCheckUpController);
  // }
}

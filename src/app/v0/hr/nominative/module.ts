import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { HRIdModule } from './id/module';
import { checkAuthMiddleware } from 'src/middleware/check-auth.middleware';

@Module({
  imports: [DbModule, HRIdModule],
  controllers: [],
  providers: [],
})
export class HRModule {}

import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { HRIdUpdateLeaveController } from './update-leave/controller';
import { HRIdUpdateLeaveServices } from './update-leave/services';

@Module({
  imports: [DbModule],
  controllers: [HRIdUpdateLeaveController],
  providers: [HRIdUpdateLeaveServices],
})
export class HRIdModule {}

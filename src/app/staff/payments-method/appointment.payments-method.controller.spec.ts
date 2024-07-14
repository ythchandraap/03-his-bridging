import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentPaymentsMethodServices } from './appointment.payments-method.service';
import { AppointmentPaymentsMethodController } from './appointment.payments-method.controller';

describe('RecipeController', () => {
  let controller: AppointmentPaymentsMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentPaymentsMethodController],
      providers: [AppointmentPaymentsMethodServices],
    }).compile();

    controller = module.get<AppointmentPaymentsMethodController>(
      AppointmentPaymentsMethodController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

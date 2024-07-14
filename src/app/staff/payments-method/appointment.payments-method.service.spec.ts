import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentPaymentsMethodServices } from './appointment.payments-method.service';

describe('RecipeService', () => {
  let service: AppointmentPaymentsMethodServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentPaymentsMethodServices],
    }).compile();

    service = module.get<AppointmentPaymentsMethodServices>(
      AppointmentPaymentsMethodServices,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

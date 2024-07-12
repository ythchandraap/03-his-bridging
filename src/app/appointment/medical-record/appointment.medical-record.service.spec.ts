import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentMedicalRecordServices } from './appointment.medical-record.service';

describe('RecipeService', () => {
  let service: AppointmentMedicalRecordServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentMedicalRecordServices],
    }).compile();

    service = module.get<AppointmentMedicalRecordServices>(
      AppointmentMedicalRecordServices,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

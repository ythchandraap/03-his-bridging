import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentMedicalRecordController } from './appointment.medical-record.controller';
import { AppointmentMedicalRecordServices } from './appointment.medical-record.service';

describe('RecipeController', () => {
  let controller: AppointmentMedicalRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentMedicalRecordController],
      providers: [AppointmentMedicalRecordServices],
    }).compile();

    controller = module.get<AppointmentMedicalRecordController>(
      AppointmentMedicalRecordController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentMedicalStaffScheduleServices } from './appointment.medical-staff-schedule.service';

describe('RecipeService', () => {
  let service: AppointmentMedicalStaffScheduleServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentMedicalStaffScheduleServices],
    }).compile();

    service = module.get<AppointmentMedicalStaffScheduleServices>(
      AppointmentMedicalStaffScheduleServices,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

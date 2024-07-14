import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentClinicsServices } from './appointment.clinics.service';

describe('RecipeService', () => {
  let service: AppointmentClinicsServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentClinicsServices],
    }).compile();

    service = module.get<AppointmentClinicsServices>(
      AppointmentClinicsServices,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

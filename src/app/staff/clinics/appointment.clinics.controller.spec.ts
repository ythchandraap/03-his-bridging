import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentClinicsController } from './appointment.clinics.controller';
import { AppointmentClinicsServices } from './appointment.clinics.service';

describe('RecipeController', () => {
  let controller: AppointmentClinicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentClinicsController],
      providers: [AppointmentClinicsServices],
    }).compile();

    controller = module.get<AppointmentClinicsController>(
      AppointmentClinicsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

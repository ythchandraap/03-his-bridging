import { Test, TestingModule } from '@nestjs/testing';
import { MedicalStaffController } from './medical-staff.controller';
import { MedicalStaffServices } from './medical-staff.service';

describe('RecipeController', () => {
  let controller: MedicalStaffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalStaffController],
      providers: [MedicalStaffServices],
    }).compile();

    controller = module.get<MedicalStaffController>(MedicalStaffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

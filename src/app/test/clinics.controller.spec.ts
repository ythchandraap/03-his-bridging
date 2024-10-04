import { Test, TestingModule } from '@nestjs/testing';
import { ClinicsController } from './test.controller';
import { ClinicsServices } from './test.service';

describe('RecipeController', () => {
  let controller: ClinicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicsController],
      providers: [ClinicsServices],
    }).compile();

    controller = module.get<ClinicsController>(ClinicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

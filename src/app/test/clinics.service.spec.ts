import { Test, TestingModule } from '@nestjs/testing';
import { ClinicsServices } from './test.service';

describe('RecipeService', () => {
  let service: ClinicsServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicsServices],
    }).compile();

    service = module.get<ClinicsServices>(ClinicsServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EducationsServices } from './educations.service';

describe('RecipeService', () => {
  let service: EducationsServices;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationsServices],
    }).compile();

    service = module.get<EducationsServices>(EducationsServices);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

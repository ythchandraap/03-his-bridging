import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './list-check-up.controller';
import { AuthenticationService } from './list-check-up.service';

describe('RecipeController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

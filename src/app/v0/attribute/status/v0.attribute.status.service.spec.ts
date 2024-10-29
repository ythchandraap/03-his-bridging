describe('RecipeService', () => {
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [V0AttributeStatusServices],
  //   }).compile();

  //   service = module.get<V0AttributeStatusServices>(V0AttributeStatusServices);
  // });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
  //
  function sum(a, b) {
    return a + b;
  }
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});

import { MatCascaderModule } from './mat-cascader.module';

describe('MatCascaderModule', () => {
  let matCascaderModule: MatCascaderModule;

  beforeEach(() => {
    matCascaderModule = new MatCascaderModule();
  });

  it('should create an instance', () => {
    expect(matCascaderModule).toBeTruthy();
  });
});

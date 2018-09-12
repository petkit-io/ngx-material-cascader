import { TestBed, inject } from '@angular/core/testing';

import { MatCascaderService } from './mat-cascader.service';

describe('MatCascaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatCascaderService]
    });
  });

  it('should be created', inject([MatCascaderService], (service: MatCascaderService) => {
    expect(service).toBeTruthy();
  }));
});

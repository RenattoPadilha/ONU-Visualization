import { TestBed } from '@angular/core/testing';

import { CategoriesControlService } from './categories-control.service';

describe('CategoriesControlService', () => {
  let service: CategoriesControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

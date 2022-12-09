import { TestBed } from '@angular/core/testing';

import { CsvManagerService } from './csv-manager.service';

describe('CsvManagerService', () => {
  let service: CsvManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

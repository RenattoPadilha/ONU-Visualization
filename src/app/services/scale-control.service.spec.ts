import { TestBed } from '@angular/core/testing';

import { ScaleControlService } from './scale-control.service';

describe('ScaleControlService', () => {
  let service: ScaleControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScaleControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

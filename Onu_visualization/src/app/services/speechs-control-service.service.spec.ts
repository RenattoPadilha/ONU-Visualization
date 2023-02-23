import { TestBed } from '@angular/core/testing';

import { SpeechsControlServiceService } from './speechs-control-service.service';

describe('SpeechsControlServiceService', () => {
  let service: SpeechsControlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechsControlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

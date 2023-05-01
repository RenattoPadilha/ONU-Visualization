import { TestBed } from '@angular/core/testing';

import { ServiceCommunicationService } from './service-communication.service';

describe('ServiceCommunicationService', () => {
  let service: ServiceCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { FiRequestService } from './firequest.service';

describe('FirequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiRequestService]
    });
  });

  it('should be created', inject([FiRequestService], (service: FiRequestService) => {
    expect(service).toBeTruthy();
  }));
});

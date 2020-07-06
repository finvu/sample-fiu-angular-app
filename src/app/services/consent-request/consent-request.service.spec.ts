import { TestBed } from '@angular/core/testing';

import { ConsentRequestService } from './consent-request.service';

describe('ConsentRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsentRequestService = TestBed.get(ConsentRequestService);
    expect(service).toBeTruthy();
  });
});

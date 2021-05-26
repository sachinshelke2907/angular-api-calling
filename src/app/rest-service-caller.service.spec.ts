import { TestBed } from '@angular/core/testing';

import { RestServiceCallerService } from './rest-service-caller.service';

describe('RestServiceCallerService', () => {
  let service: RestServiceCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestServiceCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

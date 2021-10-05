import { TestBed } from '@angular/core/testing';

import { CustServiceService } from './cust-service.service';

describe('CustServiceService', () => {
  let service: CustServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CustTableBulkService } from './cust-table-bulk.service';

describe('CustTableBulkService', () => {
  let service: CustTableBulkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustTableBulkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

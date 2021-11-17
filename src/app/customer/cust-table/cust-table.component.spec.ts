import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustTableComponent } from './cust-table.component';

describe('CustTableComponent', () => {
  let component: CustTableComponent;
  let fixture: ComponentFixture<CustTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

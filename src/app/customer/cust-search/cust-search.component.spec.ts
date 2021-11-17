import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustSearchComponent } from './cust-search.component';

describe('CustSearchComponent', () => {
  let component: CustSearchComponent;
  let fixture: ComponentFixture<CustSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

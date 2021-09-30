import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkRegistorComponent } from './bulk-registor.component';

describe('BulkRegistorComponent', () => {
  let component: BulkRegistorComponent;
  let fixture: ComponentFixture<BulkRegistorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkRegistorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkRegistorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

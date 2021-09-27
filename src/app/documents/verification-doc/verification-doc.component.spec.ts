import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDocComponent } from './verification-doc.component';

describe('VerificationDocComponent', () => {
  let component: VerificationDocComponent;
  let fixture: ComponentFixture<VerificationDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

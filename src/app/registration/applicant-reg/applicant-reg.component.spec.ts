import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantRegComponent } from './applicant-reg.component';

describe('ApplicantRegComponent', () => {
  let component: ApplicantRegComponent;
  let fixture: ComponentFixture<ApplicantRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

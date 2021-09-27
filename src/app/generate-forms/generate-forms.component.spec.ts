import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateFormsComponent } from './generate-forms.component';

describe('GenerateFormsComponent', () => {
  let component: GenerateFormsComponent;
  let fixture: ComponentFixture<GenerateFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

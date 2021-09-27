import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidyCalculatorComponent } from './subsidy-calculator.component';

describe('SubsidyCalculatorComponent', () => {
  let component: SubsidyCalculatorComponent;
  let fixture: ComponentFixture<SubsidyCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidyCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidyCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBCalcComponent } from './component-b-calc.component';

describe('ComponentBCalcComponent', () => {
  let component: ComponentBCalcComponent;
  let fixture: ComponentFixture<ComponentBCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentBCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentBCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

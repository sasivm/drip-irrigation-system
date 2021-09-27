import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentACalcComponent } from './component-a-calc.component';

describe('ComponentACalcComponent', () => {
  let component: ComponentACalcComponent;
  let fixture: ComponentFixture<ComponentACalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentACalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentACalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

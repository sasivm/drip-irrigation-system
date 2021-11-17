import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegTypeComponent } from './reg-type.component';

describe('RegTypeComponent', () => {
  let component: RegTypeComponent;
  let fixture: ComponentFixture<RegTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

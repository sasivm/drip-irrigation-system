import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiLandDetailsComponent } from './mi-land-details.component';

describe('MiLandDetailsComponent', () => {
  let component: MiLandDetailsComponent;
  let fixture: ComponentFixture<MiLandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiLandDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiLandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

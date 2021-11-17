import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandCropDetailsComponent } from './land-crop-details.component';

describe('LandCropDetailsComponent', () => {
  let component: LandCropDetailsComponent;
  let fixture: ComponentFixture<LandCropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandCropDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandCropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

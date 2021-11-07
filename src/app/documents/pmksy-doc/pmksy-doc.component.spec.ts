import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmksyDocComponent } from './pmksy-doc.component';

describe('PmksyDocComponent', () => {
  let component: PmksyDocComponent;
  let fixture: ComponentFixture<PmksyDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmksyDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmksyDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

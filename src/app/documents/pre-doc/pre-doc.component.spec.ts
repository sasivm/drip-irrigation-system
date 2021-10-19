import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDocComponent } from './pre-doc.component';

describe('PreDocComponent', () => {
  let component: PreDocComponent;
  let fixture: ComponentFixture<PreDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

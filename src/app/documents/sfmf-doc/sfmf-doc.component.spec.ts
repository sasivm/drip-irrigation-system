import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfmfDocComponent } from './sfmf-doc.component';

describe('SfmfDocComponent', () => {
  let component: SfmfDocComponent;
  let fixture: ComponentFixture<SfmfDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SfmfDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SfmfDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

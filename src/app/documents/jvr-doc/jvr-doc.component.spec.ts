import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JvrDocComponent } from './jvr-doc.component';

describe('JvrDocComponent', () => {
  let component: JvrDocComponent;
  let fixture: ComponentFixture<JvrDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JvrDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JvrDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

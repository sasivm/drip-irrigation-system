import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedMenuInfoComponent } from './logged-menu-info.component';

describe('LoggedMenuInfoComponent', () => {
  let component: LoggedMenuInfoComponent;
  let fixture: ComponentFixture<LoggedMenuInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedMenuInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedMenuInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

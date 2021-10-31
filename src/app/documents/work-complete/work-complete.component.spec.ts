import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCompleteComponent } from './work-complete.component';

describe('WorkCompleteComponent', () => {
  let component: WorkCompleteComponent;
  let fixture: ComponentFixture<WorkCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

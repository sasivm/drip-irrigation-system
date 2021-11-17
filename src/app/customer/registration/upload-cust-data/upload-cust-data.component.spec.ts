import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCustDataComponent } from './upload-cust-data.component';

describe('UploadCustDataComponent', () => {
  let component: UploadCustDataComponent;
  let fixture: ComponentFixture<UploadCustDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCustDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCustDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

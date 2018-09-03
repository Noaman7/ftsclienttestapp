import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadConfigComponent } from './upload-config.component';

describe('UploadConfigComponent', () => {
  let component: UploadConfigComponent;
  let fixture: ComponentFixture<UploadConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

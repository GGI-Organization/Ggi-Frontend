import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBpmnComponent } from './upload-bpmn.component';

describe('UploadBpmnComponent', () => {
  let component: UploadBpmnComponent;
  let fixture: ComponentFixture<UploadBpmnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBpmnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadBpmnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

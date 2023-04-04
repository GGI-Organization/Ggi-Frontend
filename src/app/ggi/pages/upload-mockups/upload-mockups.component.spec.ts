import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMockupsComponent } from './upload-mockups.component';

describe('UploadMockupsComponent', () => {
  let component: UploadMockupsComponent;
  let fixture: ComponentFixture<UploadMockupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMockupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMockupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

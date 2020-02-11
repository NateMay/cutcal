import { async, TestBed } from '@angular/core/testing';
import { ImageUploadModule } from './image-upload.module';

describe('ImageUploadModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ImageUploadModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ImageUploadModule).toBeDefined();
  });
});

import { TestBed } from '@angular/core/testing';
import { DocUtilModule } from './doc-utils.module';

describe('DocUtilModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [DocUtilModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(DocUtilModule).toBeDefined();
  });
});

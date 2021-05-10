import {  TestBed } from '@angular/core/testing';
import { CutCalModule } from './cutcal-root.module';

describe('AppModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [CutCalModule]
    }).compileComponents();
  });

  it('should create', () => {
    expect(CutCalModule).toBeDefined();
  });
});

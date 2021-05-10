import { async, TestBed } from '@angular/core/testing';
import { RecipeBuilderModule } from './recipe-builder.module';

describe('RecipeBuilderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RecipeBuilderModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(RecipeBuilderModule).toBeDefined();
  });
});

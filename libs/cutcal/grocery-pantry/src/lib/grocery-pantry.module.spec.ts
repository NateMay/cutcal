import { async, TestBed } from '@angular/core/testing';
import { GroceryPantryModule } from './grocery-pantry.module';

describe('GroceryPantryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GroceryPantryModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(GroceryPantryModule).toBeDefined();
  });
});

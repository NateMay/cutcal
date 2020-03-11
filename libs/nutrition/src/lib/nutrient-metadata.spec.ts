import { NUTRIENTS } from './nutrient-metadata';

describe('Nutrient Metadata', () => {
  const nutrients = NUTRIENTS;

  it('creats allDetails getter', () => {
    expect(nutrients.allDetails.water).toBeDefined();
  });

  it('creats ids getter', () => {
    expect(nutrients.ids.vitC).toBe(1162);
  });

  it('creats nutrients getter', () => {
    expect(nutrients.nutrients.vitA).toBe('Vitamin A, IU');
  });

  it('creats shortNames getter', () => {
    expect(nutrients.shortNames.sugar).toBe('Sugar');
  });

  it('creats units getter', () => {
    expect(nutrients.units.iron).toBe('mg');
  });
});

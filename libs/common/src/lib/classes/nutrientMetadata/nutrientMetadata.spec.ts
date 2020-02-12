// nx

import { NUTRIENTS } from './nutrientMetadata';

describe('Nutrient Metadata', () => {
  const nutrients = NUTRIENTS;

  it('creats allDetails getter', () => {
    expect(nutrients.allDetails.water).toBeDefined();
  });

  it('creats ids getter', () => {
    expect(nutrients.ids.vit_C).toBe(1162);
  });

  it('creats nutrients getter', () => {
    expect(nutrients.nutrients.vit_A).toBe('Vitamin A, IU');
  });

  it('creats shortNames getter', () => {
    expect(nutrients.shortNames.sugar).toBe('Sugar');
  });

  it('creats units getter', () => {
    expect(nutrients.units.iron).toBe('mg');
  });
});

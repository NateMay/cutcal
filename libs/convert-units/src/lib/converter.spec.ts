import { removeDups } from '@cutcal/core';
import { keys } from 'lodash';
import { UnitConverter } from './converter';
import { MASS } from './mass';
import { VOLUME } from './volume';
describe('UnitConverter', () => {
  const massUnits = [...keys({ ...MASS.imperial, ...MASS.metric })];
  const volumeUnits = [...keys({ ...VOLUME.imperial, ...VOLUME.metric })];
  const allUnits = [...massUnits, ...volumeUnits];

  it('should get posible converstions', () => {
    const converter = new UnitConverter();
    expect(converter.measures()).toEqual(['mass', 'volume']);
  });

  it('should get all possibilities', () => {
    const possibilities = new UnitConverter().possibilities();

    // same count as keys from MeasureBase
    expect(allUnits).toHaveLength(possibilities.length);

    // no duplicates
    expect(removeDups(possibilities)).toHaveLength(possibilities.length);

    // same as keys from MeasureBase
    possibilities.forEach(possible => {
      expect(allUnits).toContain(possible);
    });
  });

  it('should get metric possibilities', () => {
    const possibilities = new UnitConverter().from('g').possibilities();

    // same count as keys from MeasureBase
    expect(massUnits).toHaveLength(possibilities.length);

    // no duplicates
    expect(removeDups(possibilities)).toHaveLength(possibilities.length);

    // same as keys from MeasureBase
    possibilities.forEach(possible => {
      expect(massUnits).toContain(possible);
    });
  });

  it('should convert volumn within system', () => {
    const result = new UnitConverter(1).from('l').to('ml');
    expect(result).toBe(1000);
  });

  it('should convert volumn across systems', () => {
    const result = new UnitConverter(1).from('l').to('tsp');
    expect(result).toBeCloseTo(202.8841356, 7);
  });

  it('should convert mass within system', () => {
    const result = new UnitConverter(1).from('g').to('kg');
    expect(result).toBe(0.001);
  });

  it('should convert mass across systems', () => {
    const result = new UnitConverter(1).from('lb').to('kg');
    expect(result).toBeCloseTo(0.453592, 6);
  });
});

import { ordinalSuffixOf } from './ordinalSuffixOf';

describe('ordinalSuffixOf() - shared/functions', () => {
  it('should get the "st"s', () => {
    expect(ordinalSuffixOf(1)).toBe('1st');
    expect(ordinalSuffixOf(801)).toBe('801st');
    expect(ordinalSuffixOf(591)).toBe('591st');
    expect(ordinalSuffixOf(11)).not.toBe('11st');
    expect(ordinalSuffixOf(411)).not.toBe('411st');
  });

  it('should get the "nd"s', () => {
    expect(ordinalSuffixOf(2)).toBe('2nd');
    expect(ordinalSuffixOf(502)).toBe('502nd');
    expect(ordinalSuffixOf(12)).not.toBe('12nd');
    expect(ordinalSuffixOf(312)).not.toBe('312nd');
  });

  it('should get the "rd"s', () => {
    expect(ordinalSuffixOf(3)).toBe('3rd');
    expect(ordinalSuffixOf(503)).toBe('503rd');
    expect(ordinalSuffixOf(13)).not.toBe('13rd');
    expect(ordinalSuffixOf(713)).not.toBe('713rd');
  });

  it('should get the "th"s', () => {
    expect(ordinalSuffixOf(4)).toBe('4th');
    expect(ordinalSuffixOf(5)).toBe('5th');
    expect(ordinalSuffixOf(716)).toBe('716th');
    expect(ordinalSuffixOf(508)).toBe('508th');
    expect(ordinalSuffixOf(19)).toBe('19th');
  });

  it('should return the "th" for number ending in 11 12, and 13', () => {
    expect(ordinalSuffixOf(11)).toBe('11th');
    expect(ordinalSuffixOf(411)).toBe('411th');
    expect(ordinalSuffixOf(12)).toBe('12th');
    expect(ordinalSuffixOf(412)).toBe('412th');
    expect(ordinalSuffixOf(13)).toBe('13th');
    expect(ordinalSuffixOf(413)).toBe('413th');
  });
});

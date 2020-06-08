import { OrdinalSuffixPipe } from './ordinal-suffix.pipe';

describe('OrdinalSuffixPipe', () => {
  let pipe: OrdinalSuffixPipe;

  beforeEach(() => {
    pipe = new OrdinalSuffixPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should get the "st"s', () => {
    expect(pipe.transform(1)).toBe('1st');
    expect(pipe.transform(801)).toBe('801st');
    expect(pipe.transform(591)).toBe('591st');
    expect(pipe.transform(11)).not.toBe('11st');
    expect(pipe.transform(411)).not.toBe('411st');
  });

  it('should get the "nd"s', () => {
    expect(pipe.transform(2)).toBe('2nd');
    expect(pipe.transform(502)).toBe('502nd');
    expect(pipe.transform(12)).not.toBe('12nd');
    expect(pipe.transform(312)).not.toBe('312nd');
  });

  it('should get the "rd"s', () => {
    expect(pipe.transform(3)).toBe('3rd');
    expect(pipe.transform(503)).toBe('503rd');
    expect(pipe.transform(13)).not.toBe('13rd');
    expect(pipe.transform(713)).not.toBe('713rd');
  });

  it('should get the "th"s', () => {
    expect(pipe.transform(4)).toBe('4th');
    expect(pipe.transform(5)).toBe('5th');
    expect(pipe.transform(716)).toBe('716th');
    expect(pipe.transform(508)).toBe('508th');
    expect(pipe.transform(19)).toBe('19th');
  });

  it('should return the "th" for number ending in 11 12, and 13', () => {
    expect(pipe.transform(11)).toBe('11th');
    expect(pipe.transform(411)).toBe('411th');
    expect(pipe.transform(12)).toBe('12th');
    expect(pipe.transform(412)).toBe('412th');
    expect(pipe.transform(13)).toBe('13th');
    expect(pipe.transform(413)).toBe('413th');
  });
});

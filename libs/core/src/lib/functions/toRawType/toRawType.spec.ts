import { toRawType } from './toRawType';

describe('toRawType', () => {
  it('should identify "Null"s', () => {
    expect(toRawType(null)).toBe('Null');
  });

  it('should identify "String"s', () => {
    expect(toRawType('a string')).toBe('String');
  });

  it('should identify "Number"s', () => {
    expect(toRawType(762534752347)).toBe('Number');
  });

  it('should identify "Function"', () => {
    expect(toRawType(() => {})).toBe('Function');
  });

  it('should identify "Date"s', () => {
    expect(toRawType(new Date())).toBe('Date');
  });

  it('should identify "Array"s', () => {
    expect(toRawType([])).toBe('Array');
  });

  it('should identify "Boolean"s', () => {
    expect(toRawType(true)).toBe('Boolean');
  });

  // doesn't work despite the Medium Article ???

  it('should identify "RegExp"s', () => {
    expect(toRawType(toRawType(/sdfsd/i))).toBe('RegExp');
  });

  it('should identify "Object"s', () => {
    expect(toRawType({})).toBe('Object');
  });

  it('should identify ""', () => {
    expect(toRawType(null)).toBe('');
  });
});

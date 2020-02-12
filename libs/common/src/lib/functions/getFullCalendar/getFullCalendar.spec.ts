import { getFullCalendar } from './getFullCalendar';
describe('getFullCalendar() - shared/functions', () => {

  it('should get calendar dates for any date in the month, given any date in that month', () => {
    const month = getFullCalendar(new Date(2016, 0, 4))

    expect( month.length ).toBe(42)

    expect(month[0]).toEqual(new Date(2015, 11, 27));
    expect(month[5]).toEqual(new Date(2016, 0, 1));
    expect(month[35]).toEqual(new Date(2016, 0, 31));

  })

  it('should not return weeks in which there are no days in the current month', () => {
    const month = getFullCalendar(new Date(2019, 0, 4))

    expect( month.length ).toBe(35)

    expect(month[0]).toEqual(new Date(2018, 11, 30));
    expect(month[2]).toEqual(new Date(2019, 0, 1));
    expect(month[32]).toEqual(new Date(2019, 0, 31));

  })

  it('should account for 28 day februaries that being on sunday and only have 4 weeks', () => {
    const month = getFullCalendar(new Date(2009, 1, 4))

    expect( month.length ).toBe(28)

    expect(month[0]).toEqual(new Date(2009, 1, 1));
    expect(month[27]).toEqual(new Date(2009, 1, 28));

  })

})

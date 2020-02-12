import { dateOutlet } from './dateOutlet';
describe('dateOutlet() - shared/functions', () => {

  it('should create the auxiliary route object for the calendar module, given a date', () => {

    expect(
      dateOutlet(new Date(2000, 0, 1))
    ).toEqual({ outlets: { 'dmy': '1-1-2000' } })

    expect(
      dateOutlet(new Date(2000, 1, 29))
    ).toEqual({ outlets: { 'dmy': '29-2-2000' } })

  })

})


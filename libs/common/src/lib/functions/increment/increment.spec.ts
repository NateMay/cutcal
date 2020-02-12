import { getQuantityStep, increment } from './increment';

describe('getQuantityStep() - shared/functions', () => {

  it('should return 0 if below 0.01', () => {
    expect(
      getQuantityStep(0.003)
    ).toBe(0.003);
  })

  it('should return a step of 0.01 if the quaity is between 0.01 and 0.05', () => {
    expect(
      getQuantityStep(0.04)
    ).toBe(0.01)
  })

  it('should return a step of 0.01 if the quaity is between 0.05 and 0.25', () => {
    expect(
      getQuantityStep(0.15)
    ).toBe(0.05)
  })

  it('should return a step of 0.05 if the quaity is between 0.25 and 0.5', () => {
    expect(
      getQuantityStep(0.35)
    ).toBe(0.35 / 2)
  })

  it('should return a step of 0.25 if the quaity is between 0.5 and 2', () => {
    expect(
      getQuantityStep(1.3)
    ).toBe(0.25)

    expect(
      getQuantityStep(1.99)
    ).toBe(0.25)
  })

  it('should return a step of 0.5 if the quaity is between 2 and 5', () => {
    expect(
      getQuantityStep(2.1)
    ).toBe(0.5)

    expect(
      getQuantityStep(4.9)
    ).toBe(0.5)
  })

  it('should return a step of 1 if the quaity is between 5 and 30', () => {
    expect(
      getQuantityStep(6)
    ).toBe(1)

    expect(
      getQuantityStep(29)
    ).toBe(1)
  })

  it('should return a step of 5 if the quaity is above 30', () => {
    expect(
      getQuantityStep(31)
    ).toEqual(5)

    expect(
      getQuantityStep(29423)
    ).toEqual(5)
  })
})



describe('increment() - shared/functions', () => {
  it('should return the next value in the step sequence', () => {
    expect(
      increment(100, 1)
    ).toEqual(105)

    expect(
      increment(100, -1)
    ).toEqual(95)

    expect(
      increment(4, -1)
    ).toEqual(3.5)
  })
})

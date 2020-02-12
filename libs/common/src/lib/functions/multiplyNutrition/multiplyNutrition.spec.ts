import { multiplyNutrition } from './multiplyNutrition';
describe('multiplyNutrition() - shared/functions', () => {

  it('should multiply every value in a nutrition object', () => {

    expect(
      multiplyNutrition({
        calories: 120,
        carbohydrates: 1,
        protein: 3,
        fat: 5,
        alcohol: 17
      }, 4)
    ).toEqual({
      calories: 480,
      carbohydrates: 4,
      protein: 12,
      fat: 20,
      alcohol: 68
    })

  })
})

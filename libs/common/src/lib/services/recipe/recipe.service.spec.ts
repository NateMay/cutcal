import { TestBed } from '@angular/core/testing';
import { RecipeSvc } from './recipe.service';

// DEPENDS ON (recipe) then TEST (recipe-service)

describe('Recipe Service', () => {

  let recipeSvc: RecipeSvc;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipeSvc
      ]
    })

    recipeSvc = TestBed.get(RecipeSvc)
  })

  it('injects the foodgroup service', () => {
    expect(recipeSvc).toBeTruthy()
  })


})

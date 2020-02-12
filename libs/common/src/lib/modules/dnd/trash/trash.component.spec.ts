import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MealService } from '../../../services/meal/meal.service';
import { DndModule } from '../dnd.module';
import { TrashComponent } from './trash.component';


// TEST (trash)

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  const mealSvcStub = {
    deleteMeal: () => {},
    deleteUsage: () => {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DndModule],
      providers: [
        { provide: MealService, useValue: mealSvcStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

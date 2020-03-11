import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MealService } from '@cutcal/diet';
import { DndModule } from '../../modules/dnd/dnd.module';
import { TrashComponent } from './trash.component';

// TEST (trash)

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  const mealSvcStub = {
    deleteMeal: (): void => {},
    deleteUsage: (): void => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrashComponent],
      imports: [DndModule],
      providers: [{ provide: MealService, useValue: mealSvcStub }],
    }).compileComponents();
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

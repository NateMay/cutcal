import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmPmModule } from '../../../am-pm/src/lib/am-pm.module';
import { AmPmPlagroundComponent } from './am-pm-plaground.component';

describe('AmPmPlagroundComponent', () => {
  let component: AmPmPlagroundComponent;
  let fixture: ComponentFixture<AmPmPlagroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmPmPlagroundComponent],
      imports: [AmPmModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmPmPlagroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

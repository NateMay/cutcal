import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonUiSidenavComponent } from './common-ui-sidenav.component';

describe('CommonUiSidenavComponent', () => {
  let component: CommonUiSidenavComponent;
  let fixture: ComponentFixture<CommonUiSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatListModule],
      declarations: [CommonUiSidenavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonUiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

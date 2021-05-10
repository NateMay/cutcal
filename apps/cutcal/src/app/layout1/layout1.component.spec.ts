import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderModule } from './header/header.module';
import { Layout1Component } from './layout1.component';
import { SidebarModule } from './sidebar/sidebar.module';

describe('Layout1Component', () => {
  let component: Layout1Component;
  let fixture: ComponentFixture<Layout1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SidebarModule,
        HeaderModule,
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        NoopAnimationsModule
      ],
      declarations: [Layout1Component]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

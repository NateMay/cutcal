import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CutCalComponent } from './cutcal-root';

@Component({
  selector: 'ds-sidebar-search,sidebar-search',
  template: ''
})
class MockSideSearch {}

@Component({
  selector: 'ds-header,header',
  template: ''
})
class MockHeader {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CutCalComponent, MockSideSearch, MockHeader],
      imports: [
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CutCalComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CutCalRoutingModule } from './cutcal.routing';
import { Layout1Component } from './layout1/layout1.component';

describe('RoutingModule', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [Layout1Component],
      imports: [CutCalRoutingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create', () => {
    expect(CutCalRoutingModule).toBeDefined();
  });
});

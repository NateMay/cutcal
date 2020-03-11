import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { getAllDe } from '@cutcal/ng-testing';
import { BreadCrumb } from './breadcrumb';
import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;

  const crumbs: BreadCrumb[] = [
    {
      route: ['abc', '123'],
      label: 'first',
    },
    {
      route: ['abc', '123', 'xyz'],
      label: 'last',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsComponent],
      providers: [{ provide: Router, useValue: { navigate: (): void => {} } }],
    });
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
  });

  it('should load instance', () => {
    expect(component).toBeTruthy();
  });

  it('crumbs render', () => {
    component.crumbs = crumbs;
    fixture.detectChanges();

    const links = getAllDe(fixture, 'a');
    expect(links).toHaveLength(3);
    expect(links[0].nativeElement.textContent).toContain('home');
    expect(links[1].nativeElement.textContent).toContain('first');
    expect(links[2].nativeElement.textContent).toContain('last');
  });

  it('routes call properly', () => {
    const spy = jest.spyOn(TestBed.inject(Router), 'navigate');
    component.crumbs = crumbs;
    fixture.detectChanges();

    const links = getAllDe(fixture, 'a');
    expect(links).toHaveLength(3);
    links[2].nativeElement.click();

    expect(spy).toHaveBeenCalledWith(['abc', '123', 'xyz']);
  });
});

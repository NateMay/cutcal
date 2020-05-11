// import {
//   HttpClientTestingModule,
//   HttpTestingController
// } from '@angular/common/http/testing';
// import {
//   async,
//   ComponentFixture,
//   getTestBed,
//   TestBed
// } from '@angular/core/testing';
// import { MatButtonModule } from '@angular/material/button';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AppComponent } from './food-review.component';

// _describe('AppComponent', () => {
//   let fixture: ComponentFixture<AppComponent>;
//   let component: AppComponent;

//   let injector: TestBed;
//   let httpMock: HttpTestingController;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientTestingModule,
//         MatFormFieldModule,
//         MatInputModule,
//         NoopAnimationsModule,
//         MatButtonModule,
//         MatListModule,
//         MatSidenavModule
//       ],
//       declarations: [AppComponent]
//     }).compileComponents();

//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.debugElement.componentInstance;

//     injector = getTestBed();
//     httpMock = injector.get(HttpTestingController);
//   }));

//   afterEach(() => {
//     httpMock.verify();
//   });

//   _it('should create the app', () => {
//     const httpRequest = httpMock.expectOne(
//       'https://www.googleapis.com/customsearch/v1?key=AIzaSyAspWF0dPGZo9XRlZpTn4j3ZzoAtrJJIpA&cx=005525034399704142974:oxjpozizj0m&q=avocado'
//     );
//     expect(httpRequest.request.method).toBe('GET');
//     expect(component).toBeTruthy();
//     httpRequest.flush({ name: 'Avocado' });
//   });
// });

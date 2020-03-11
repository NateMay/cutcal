import { Injectable } from '@angular/core'
// import { AppState } from '../../redux/app.state'

/**
 * @description Loads a spinner while the data loads.
 * Not currently used, but could be a furture optimization.
 * @see {@link https://medium.com/better-programming/angular-loader-interceptor-f0b37e244ccb Medium}
 */

@Injectable()
export class LoaderInterceptor /* implements HttpInterceptor */ {
  // constructor(private store: Store<AppState>) {}
  // intercept(
  //   req: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   // this.store.dispatch(new ShowLoaderAction());
  //   return next.handle(req).pipe(
  //     finalize(() => {
  //       // this.store.dispatch(new HideLoaderAction())
  //     })
  //   )
  // }
}

import { Injectable } from '@angular/core'
// import { AppState } from '../../redux/app.state'

/**
 * Loads a spinner while the data loads
 * @refrence [Medium] {@link https://medium.com/better-programming/angular-loader-interceptor-f0b37e244ccb}
 * @note not currently used, but could be a furture optimization
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
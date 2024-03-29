import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { startWith, tap } from 'rxjs/operators'
import { RequestCache } from '../services/request-cache.service'

/**
 * @description If request is cachable (e.g., package search) and
 * response is in cache return the cached response as observable.
 * If has 'x-refresh' header that is true,
 * then also re-run the package search, using response from next(),
 * returning an observable that emits the cached response first.
 * If not in cache or not cachable, pass request through to next()
 * @see {@link https://github.com/angular/angular/blob/master/aio/content/examples/http/src/app/ Github}
 *
 * Not currently used, but could be a furture optimization
 */

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private readonly cache: RequestCache) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // continue if not cachable.
    if (!isCachable(req)) {
      return next.handle(req)
    }

    const cachedResponse = this.cache.get(req)

    // cache-then-refresh
    if (req.headers.get('x-refresh')) {
      const results$ = sendRequest(req, next, this.cache)
      return cachedResponse
        ? results$.pipe(startWith(cachedResponse))
        : results$
    }

    // cache-or-fetch
    return cachedResponse
      ? of(cachedResponse)
      : sendRequest(req, next, this.cache)
  }
}

/** Is this request cachable? */
const isCachable = (
  req: HttpRequest<any>
): boolean => // Only GET requests are cachable
  req.method === 'GET' &&
  // Only npm package search is cachable in this app
  -1 < req.url.indexOf('https://npmsearch.com/query')

/**
 * Get server response observable by sending request to `next()`.
 * Will add the response to the cache on the way out.
 */
function sendRequest(
  req: HttpRequest<any>,
  next: HttpHandler,
  cache: RequestCache
): Observable<HttpEvent<any>> {
  // No headers allowed in npm search request
  const noHeaderReq = req.clone({ headers: new HttpHeaders() })

  return next.handle(noHeaderReq).pipe(
    tap((event) => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        cache.put(req, event) // Update the cache.
      }
    })
  )
}

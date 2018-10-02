import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

/**
 * Adds paused value from header to response body
 *
 * @export
 * @class PausedInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class PausedInterceptor implements HttpInterceptor {
  /**
   * Returns paused value from response object
   *
   * @param {HttpResponse<QueueItem>} res
   * @returns {boolean}
   * @memberof PausedInterceptor
   */
  public getPaused(res: HttpResponse<QueueItem>): boolean {
    const paused = res.headers.get('Paused');
    if (!paused) return false;
    return !!parseInt(paused, 10);
  }
  /**
   * Adds paused value to response body from header value
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof PausedInterceptor
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(`${environment.apiUrlPlayer}player/current`)) {
      return next.handle(req);
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<QueueItem>) => {
        if (event instanceof HttpResponse) {
          if (event.body) {
            event.body.paused = this.getPaused(event);
          }
        }
        return event;
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpResponse, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

@Injectable()
export class PausedInterceptor implements HttpInterceptor {

  public getPaused(res: HttpResponse<QueueItem>): boolean {
    const paused = !!parseInt(res.headers.get('Paused'), 10);
    return paused;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(`${environment.apiUrlPlayer}player/current`)) {
      return next.handle(req);
    }

    return next.handle(req)
      .map((event: HttpEvent<QueueItem>) => {
        if (event instanceof HttpResponse) {
          event.body.paused = this.getPaused(event);
        }
        return event;
      });
  }
}

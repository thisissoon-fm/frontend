import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private storageName = `${environment.googleAuthTokenPrefix}_${environment.googleAuthTokenName}`;

  get authToken(): string {
    return localStorage.getItem(this.storageName) || null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrlPlayer)) {
      return next.handle(req);
    }
    const authReq = req.clone({ setHeaders: {'Access-Token': this.authToken }});
    return next.handle(authReq);
  }
}

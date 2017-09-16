import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment';

/**
 * Adds authentication from localStorage to all request to FM api
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Key of storage item in browser localStorage
   *
   * @private
   * @memberof AuthInterceptor
   */
  private storageName = `${environment.googleAuthTokenPrefix}_${environment.googleAuthTokenName}`;
  /**
   * Returns auth token value in localStorage
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof AuthInterceptor
   */
  private get authToken(): string {
    return this.localStorageSvc.getItem(this.storageName) || '';
  }
  /**
   * Creates an instance of AuthInterceptor.
   * @param {LocalStorageService} localStorageSvc
   * @memberof AuthInterceptor
   */
  constructor(private localStorageSvc: LocalStorageService) { }
  /**
   * Clone original request and adds auth token value to header
   * before it's sent.
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof AuthInterceptor
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrlPlayer)) {
      return next.handle(req);
    }
    const authReq = req.clone({ setHeaders: {'Access-Token': this.authToken }});
    return next.handle(authReq);
  }
}

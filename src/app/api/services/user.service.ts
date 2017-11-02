import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../shared';
import { User } from '../models';

/**
 * Request current or any user data
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  /**
   * Users endpoint url
   *
   * @private
   * @memberof UserService
   */
  private endpointUrl = `${environment.apiUrlPlayer}users/`;
  /**
   * Creates an instance of UserService.
   * @param {HttpClient} http
   * @param {LocalStorageService} localStorageSvc
   * @memberof UserService
   */
  constructor(
    private http: HttpClient,
    private localStorageSvc: LocalStorageService
  ) { }
  /**
   * Returns user data for currently authenticated user
   *
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public me(): Observable<User> {
    const storageName = `${environment.googleAuthTokenPrefix}_${environment.googleAuthTokenName}`;
    if (!!this.localStorageSvc.getItem(storageName)) {
      return this.http.get<User>(`${this.endpointUrl}authenticated`);
    }
    return Observable.throw(null);
  }
  /**
   * Get user data by `id`
   *
   * @param {string} id
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public get(id: string): Observable<User> {
    return this.http.get<User>(`${this.endpointUrl}${id}`);
  }
  /**
   * Remove user auth token
   *
   * @memberof UserService
   */
  public delete(): void {
    const storageName = `${environment.googleAuthTokenPrefix}_${environment.googleAuthTokenName}`;
    this.localStorageSvc.removeItem(storageName);
  }
}

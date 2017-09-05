import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
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
   * @memberof UserService
   */
  constructor(private http: HttpClient) { }
  /**
   * Returns user data for currently authenticated user
   *
   * @returns {Observable<User>}
   * @memberof UserService
   */
  public me(): Observable<User> {
    return this.http.get<User>(`${this.endpointUrl}authenticated`);
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
}

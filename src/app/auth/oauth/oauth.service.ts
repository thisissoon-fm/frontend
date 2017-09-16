import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/**
 * Generic service that performs oauth authentication.
 * Can be replace with platform specfic implementations
 * when required
 *
 * @export
 * @class OAuthService
 */
@Injectable()
export class OAuthService {
  /**
   * Request authenticated from service `name` and returns
   * and authentication token for that service
   *
   * @param {string} name
   * @returns {Observable<any>}
   * @memberof OAuthService
   */
  public authenticate(name: string): Observable<any> {
    return Observable.of(null);
  }
}

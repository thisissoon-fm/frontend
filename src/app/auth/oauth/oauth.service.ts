import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

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
   * @returns {Observable<void>}
   * @memberof OAuthService
   */
  public authenticate(name: string): Observable<any> {
    return observableOf(null);
  }
}

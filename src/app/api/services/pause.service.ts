import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

/**
 * Send request to pause current track playback or resume
 * current track playback
 *
 * @export
 * @class PauseService
 */
@Injectable()
export class PauseService {
  /**
   * Pause end point url
   *
   * @private
   * @memberof PauseService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/pause`;
  /**
   * Creates an instance of PauseService.
   * @param {HttpClient} http
   * @memberof PauseService
   */
  constructor(private http: HttpClient) { }
  /**
   * Pause current track playback
   *
   * @returns {Observable<any>}
   * @memberof PauseService
   */
  public post(): Observable<any> {
    return this.http.post<any>(this.endpointUrl, {});
  }
  /**
   * Resume current track playback
   *
   * @returns {Observable<any>}
   * @memberof PauseService
   */
  public delete(): Observable<any> {
    return this.http.delete<any>(this.endpointUrl);
  }
}

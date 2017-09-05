import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

/**
 * Send request to pause current track playback or resume
 * current track playback
 *
 * @export
 * @class PlayerPauseService
 */
@Injectable()
export class PlayerPauseService {
  /**
   * Pause end point url
   *
   * @private
   * @memberof PlayerPauseService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/pause`;
  /**
   * Creates an instance of PlayerPauseService.
   * @param {HttpClient} http
   * @memberof PlayerPauseService
   */
  constructor(private http: HttpClient) { }
  /**
   * Pause current track playback
   *
   * @returns {Observable<any>}
   * @memberof PlayerPauseService
   */
  public post(): Observable<any> {
    return this.http.post<any>(this.endpointUrl, null);
  }
  /**
   * Resume current track playback
   *
   * @returns {Observable<any>}
   * @memberof PlayerPauseService
   */
  public delete(): Observable<any> {
    return this.http.delete<any>(this.endpointUrl);
  }
}

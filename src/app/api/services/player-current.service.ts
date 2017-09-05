import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

/**
 * Gets the currently playing track or request to skip it
 *
 * @export
 * @class PlayerCurrentService
 */
@Injectable()
export class PlayerCurrentService {
  /**
   * Current end point url
   *
   * @private
   * @memberof PlayerCurrentService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/current`;
  /**
   * Creates an instance of PlayerCurrentService.
   * @param {HttpClient} http
   * @memberof PlayerCurrentService
   */
  constructor(private http: HttpClient) { }
  /**
   * Returns the currently playing track data
   *
   * @returns {Observable<QueueItem>}
   * @memberof PlayerCurrentService
   */
  public get(): Observable<QueueItem> {
    return this.http.get<QueueItem>(this.endpointUrl);
  }
  /**
   * Skips the currently playing track
   *
   * @returns {Observable<any>}
   * @memberof PlayerCurrentService
   */
  public delete(): Observable<any> {
    return this.http.delete<any>(this.endpointUrl);
  }
}

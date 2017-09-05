import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Track } from '../models/index';

/**
 * Get individual track data
 *
 * @export
 * @class TrackService
 */
@Injectable()
export class TrackService {
  /**
   * Tracks end point
   *
   * @private
   * @memberof TrackService
   */
  private endpointUrl = `${environment.apiUrlPlayer}tracks/`;
  /**
   * Creates an instance of TrackService.
   * @param {HttpClient} http
   * @memberof TrackService
   */
  constructor(private http: HttpClient) { }
  /**
   * Returns track data for any spotify track
   *
   * @param {string} uri
   * @returns {Observable<Track>}
   * @memberof TrackService
   */
  public get(uri: string): Observable<Track> {
    return this.http.get<Track>(`${this.endpointUrl}${uri}`);
  }
}

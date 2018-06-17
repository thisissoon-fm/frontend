import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Mute } from '../models';

/**
 * Get player mute status, request mute or request
 * unmute
 *
 * @export
 * @class MuteService
 */
@Injectable()
export class MuteService {
  /**
   * Mute end point url
   *
   * @private
   * @memberof MuteService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/mute`;
  /**
   * Creates an instance of MuteService.
   * @param {HttpClient} http
   * @memberof MuteService
   */
  constructor(private http: HttpClient) {}
  /**
   * Get player mute status
   *
   * @returns {Observable<Mute>}
   * @memberof MuteService
   */
  public get(): Observable<Mute> {
    return this.http.get<Mute>(this.endpointUrl);
  }
  /**
   * Mutes the player volume
   *
   * @returns {Observable<Mute>}
   * @memberof MuteService
   */
  public post(): Observable<Mute> {
    return this.http.post<Mute>(this.endpointUrl, {});
  }
  /**
   * Unmute the player volume
   *
   * @returns {Observable<Mute>}
   * @memberof MuteService
   */
  public delete(): Observable<Mute> {
    return this.http.delete<Mute>(this.endpointUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Mute } from '../models';

/**
 * Get player mute status, request mute or request
 * unmute
 *
 * @export
 * @class PlayerMuteService
 */
@Injectable()
export class PlayerMuteService {
  /**
   * Mute end point url
   *
   * @private
   * @memberof PlayerMuteService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/mute`;
  /**
   * Creates an instance of PlayerMuteService.
   * @param {HttpClient} http
   * @memberof PlayerMuteService
   */
  constructor(private http: HttpClient) { }
  /**
   * Get player mute status
   *
   * @returns {Observable<Mute>}
   * @memberof PlayerMuteService
   */
  public get(): Observable<Mute> {
    return this.http.get<Mute>(this.endpointUrl);
  }
  /**
   * Mutes the player volume
   *
   * @returns {Observable<Mute>}
   * @memberof PlayerMuteService
   */
  public post(): Observable<Mute> {
    return this.http.post<Mute>(this.endpointUrl, {});
  }
  /**
   * Unmute the player volume
   *
   * @returns {Observable<Mute>}
   * @memberof PlayerMuteService
   */
  public delete(): Observable<Mute> {
    return this.http.delete<Mute>(this.endpointUrl);
  }
}

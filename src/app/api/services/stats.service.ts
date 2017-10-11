import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

/**
 * Gets player stats
 *
 * @export
 * @class StatsService
 */
@Injectable()
export class StatsService {
  /**
   * Stats end point url
   *
   * @private
   * @memberof StatsService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/stats`;
  /**
   * Creates an instance of StatsService.
   * @param {HttpClient} http
   * @memberof StatsService
   */
  constructor(private http: HttpClient) { }
  /**
   * Returns stats data
   *
   * @param {HttpParams} [params]
   * @returns {Observable<any>}
   * @memberof StatsService
   */
  public get(params: HttpParams = new HttpParams()): Observable<any> {
    const options: any = { params, observe: 'body' };
    return this.http.get<any>(this.endpointUrl, options);
  }
}

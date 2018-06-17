import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { QueueItem, QueueMeta, QueueResponse } from '../models';

/**
 * Get queue items, add a track to queue or remove a track from queue
 *
 * @export
 * @class QueueService
 */
@Injectable()
export class QueueService {
  /**
   * Queue endpoint url
   *
   * @private
   * @memberof QueueService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/queue`;
  /**
   * Creates an instance of QueueService.
   * @param {HttpClient} http
   * @memberof QueueService
   */
  constructor(private http: HttpClient) {}
  /**
   * Gets list of items in the queue
   *
   * @param {HttpParams} [params]
   * @returns {Observable<QueueItem[]>}
   * @memberof QueueService
   */
  public query(
    params: HttpParams = new HttpParams()
  ): Observable<QueueResponse> {
    const options: any = { params, observe: 'response' };
    const paramsWithLimit = new HttpParams({
      fromString: params.toString()
    }).set('limit', `${environment.apiLimit}`);
    options.params = paramsWithLimit;
    return this.http.get<QueueItem[]>(this.endpointUrl, options).pipe(
      map((res: HttpResponse<QueueItem[]>) => {
        const totalCount = parseInt(res.headers.get('Total-Count'), 10) || 0;
        const totalPages = parseInt(res.headers.get('Total-Pages'), 10) || 1;
        return {
          items: res.body,
          pagination: { totalCount, totalPages }
        };
      })
    );
  }
  /**
   * Add a track to the queue
   *
   * @param {string} uri
   * @returns {Observable<any>}
   * @memberof QueueService
   */
  public post(uri: string): Observable<any> {
    return this.http.post<any>(this.endpointUrl, { uri });
  }
  /**
   * Remove a track from the queue
   *
   * @param {string} uuid
   * @returns {Observable<any>}
   * @memberof QueueService
   */
  public delete(uuid: string): Observable<any> {
    return this.http.delete(`${this.endpointUrl}/${uuid}`);
  }
  /**
   * Gets queue meta data
   *
   * @returns {Observable<QueueMeta>}
   * @memberof QueueService
   */
  public getMeta(): Observable<QueueMeta> {
    return this.http.get<QueueMeta>(`${this.endpointUrl}/meta`);
  }
}

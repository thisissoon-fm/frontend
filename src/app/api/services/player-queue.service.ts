import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem, QueueMeta } from '../models';

/**
 * Get queue items, add a track to queue or remove a track from queue
 *
 * @export
 * @class PlayerQueueService
 */
@Injectable()
export class PlayerQueueService {
  /**
   * Queue endpoint url
   *
   * @private
   * @memberof PlayerQueueService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/queue`;
  /**
   * Creates an instance of PlayerQueueService.
   * @param {HttpClient} http
   * @memberof PlayerQueueService
   */
  constructor(private http: HttpClient) { }
  /**
   * Gets list of items in the queue
   *
   * @param {HttpParams} [params]
   * @returns {Observable<QueueItem[]>}
   * @memberof PlayerQueueService
   */
  public query(params?: HttpParams): Observable<QueueItem[]> {
    const options: any = { params, observe: 'response' };
    return this.http.get<QueueItem[]>(this.endpointUrl, options)
      .map((event: HttpResponse<QueueItem[]>) => event.body);
  }
  /**
   * Add a track to the queue
   *
   * @param {string} uri
   * @returns {Observable<any>}
   * @memberof PlayerQueueService
   */
  public post(uri: string): Observable<any> {
    return this.http.post<any>(this.endpointUrl, { uri });
  }
  /**
   * Remove a track from the queue
   *
   * @param {string} uuid
   * @returns {Observable<any>}
   * @memberof PlayerQueueService
   */
  public delete(uuid: string): Observable<any> {
    return this.http.delete(`${this.endpointUrl}/${uuid}`);
  }
  /**
   * Gets queue meta data
   *
   * @returns {Observable<QueueMeta>}
   * @memberof PlayerQueueService
   */
  public getMeta(): Observable<QueueMeta> {
    return this.http.get<QueueMeta>(`${this.endpointUrl}/meta`);
  }
}

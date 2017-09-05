import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

@Injectable()
export class PlayerQueueService {

  private endpointUrl = `${environment.apiUrlPlayer}player/queue`;

  constructor(private http: HttpClient) { }

  public query(params?: HttpParams): Observable<QueueItem[]> {
    const options: any = { params, observe: 'response' };
    return this.http.get<QueueItem[]>(this.endpointUrl, options)
      .map((event: HttpResponse<QueueItem[]>) => event.body);
  }

  public post(data: { uri: string }): Observable<any> {
    return this.http.post<any>(this.endpointUrl, data);
  }

  public delete(uuid: string): Observable<any> {
    return this.http.delete(`${this.endpointUrl}/${uuid}`);
  }

}

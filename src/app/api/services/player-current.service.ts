import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

@Injectable()
export class PlayerCurrentService {

  private endpointUrl = `${environment.apiUrlPlayer}player/current`;

  constructor(private http: HttpClient) { }

  public get(): Observable<QueueItem> {
    return this.http.get<QueueItem>(this.endpointUrl);
  }

  public delete(): Observable<any> {
    return this.http.delete<any>(this.endpointUrl);
  }
}

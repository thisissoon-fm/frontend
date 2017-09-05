import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class PlayerPauseService {

  private endpointUrl = `${environment.apiUrlPlayer}player/pause`;

  constructor(private http: HttpClient) { }

  public post(): Observable<any> {
    return this.http.post<any>(this.endpointUrl, null);
  }

  public delete(): Observable<any> {
    return this.http.delete<any>(this.endpointUrl);
  }
}

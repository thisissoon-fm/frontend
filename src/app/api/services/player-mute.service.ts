import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Mute } from '../models';

@Injectable()
export class PlayerMuteService {

  private endpointUrl = `${environment.apiUrlPlayer}player/mute`;

  constructor(private http: HttpClient) { }

  public get(): Observable<Mute> {
    return this.http.get<Mute>(this.endpointUrl);
  }

  public post(): Observable<Mute> {
    return this.http.post<Mute>(this.endpointUrl, null);
  }

  public delete(): Observable<Mute> {
    return this.http.delete<Mute>(this.endpointUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Track } from '../models/index';

@Injectable()
export class TrackService {

  private endpointUrl = `${environment.apiUrlPlayer}tracks/`;

  constructor(private http: HttpClient) { }

  public get(uri: string): Observable<Track> {
    return this.http.get<Track>(`${this.endpointUrl}${uri}`);
  }
}

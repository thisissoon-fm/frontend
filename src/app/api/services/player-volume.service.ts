import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Volume } from '../models';

@Injectable()
export class PlayerVolumeService {

  private endpointUrl = `${environment.apiUrlPlayer}player/volume`;

  constructor(private http: HttpClient) { }

  public get(): Observable<Volume> {
    return this.http.get<Volume>(this.endpointUrl);
  }

  public post(volume: Volume): Observable<Volume> {
    return this.http.post<Volume>(this.endpointUrl, volume);
  }
}

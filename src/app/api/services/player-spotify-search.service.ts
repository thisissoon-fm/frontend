import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';

@Injectable()
export class PlayerSpotifySearchService {

  private endpointUrl = `${environment.apiUrlPlayer}spotify/search`;

  private readonly market = environment.spotifyMarket;

  constructor(private http: HttpClient) { }

  public searchTrack(query: string): Observable<any> {
    const options: any = {};
    const params = new HttpParams();
    params.set('q', `${query}*`);
    params.set('type', 'track');
    params.set('market', this.market);
    options.params = params;
    return this.http.get<any>(this.endpointUrl, options);
  }
}

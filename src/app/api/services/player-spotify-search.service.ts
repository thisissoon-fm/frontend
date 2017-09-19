import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { SpotifySearch } from '../models';

export type SearchType = 'album' | 'artist' | 'track';

/**
 * Searches spotify tracks, albums or artists via the FM api
 *
 * @export
 * @class PlayerSpotifySearchService
 */
@Injectable()
export class PlayerSpotifySearchService {
  /**
   * Spotify search endpoint
   *
   * @private
   * @memberof PlayerSpotifySearchService
   */
  private endpointUrl = `${environment.apiUrlPlayer}spotify/search`;
  /**
   * Creates an instance of PlayerSpotifySearchService.
   * @param {HttpClient} http
   * @memberof PlayerSpotifySearchService
   */
  constructor(private http: HttpClient) { }
  /**
   * Search spotify for tracks, artists or albums with a query string
   *
   * @param {string} query
   * @returns {Observable<SpotifySearch>}
   * @memberof PlayerSpotifySearchService
   */
  public search(query: string, type: SearchType = 'track', params: HttpParams = new HttpParams()): Observable<SpotifySearch> {
    const options: any = { observe: 'response'};
    const paramsWithLimit = new HttpParams({ fromString: params.toString() })
      .set('q', `${query}*`)
      .set('type', type)
      .set('market', `${environment.spotifyMarket}`);
    options.params = paramsWithLimit;
    return this.http.get<SpotifySearch>(this.endpointUrl, options)
      .map((event: HttpResponse<SpotifySearch>) => event.body);
  }
}

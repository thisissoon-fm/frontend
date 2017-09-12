import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { QueueItem, SpotifySearch } from '../models';

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
   * Market code to filter search results
   *
   * @private
   * @memberof PlayerSpotifySearchService
   */
  private readonly market = environment.spotifyMarket;
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
   * @returns {Observable<any>}
   * @memberof PlayerSpotifySearchService
   */
  public search(query: string, type: SearchType = 'track'): Observable<SpotifySearch> {
    const options: any = { observe: 'response'};
    const params = new HttpParams()
      .set('q', `${query}*`)
      .set('type', type)
      .set('market', this.market);
    options.params = params;
    return this.http.get<SpotifySearch>(this.endpointUrl, options)
      .map((event: HttpResponse<SpotifySearch>) => event.body);
  }
}

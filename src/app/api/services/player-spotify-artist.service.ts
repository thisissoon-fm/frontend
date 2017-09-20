import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { SpotifySearch, SpotifyArtist, SpotifyAlbums } from '../models';

/**
 * Get artists data from player spotify api
 *
 * @export
 * @class PlayerSpotifyArtistService
 */
@Injectable()
export class PlayerSpotifyArtistService {
  /**
   * Spotify search endpoint
   *
   * @private
   * @memberof PlayerSpotifyArtistService
   */
  private endpointUrl = `${environment.apiUrlPlayer}spotify/artists`;
  /**
   * Creates an instance of PlayerSpotifyArtistService.
   * @param {HttpClient} http
   * @memberof PlayerSpotifyArtistService
   */
  constructor(private http: HttpClient) { }
  /**
   * Get artist detail data
   *
   * @param {string} id
   * @returns {Observable<SpotifyArtist>}
   * @memberof PlayerSpotifyArtistService
   */
  public get(id: string): Observable<SpotifyArtist> {
    return this.http.get<SpotifyArtist>(`${this.endpointUrl}/${id}`);
  }
  /**
   * Get list of artist albums
   *
   * @param {string} id
   * @param {HttpParams} [params=new HttpParams()]
   * @returns {Observable<SpotifyAlbums>}
   * @memberof PlayerSpotifyArtistService
   */
  public getAlbums(id: string, params: HttpParams = new HttpParams()): Observable<SpotifyAlbums> {
    const options: any = { observe: 'response'};
    const paramsWithLimit = new HttpParams({ fromString: params.toString() })
      .set('album_type', 'album')
      .set('market', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    options.params = paramsWithLimit;
    return this.http.get<SpotifyAlbums>(`${this.endpointUrl}/${id}/albums`, options)
      .map((event: HttpResponse<SpotifyAlbums>) => event.body);
  }
  /**
   * Get list of artist singles
   *
   * @param {string} id
   * @param {HttpParams} [params=new HttpParams()]
   * @returns {Observable<SpotifyAlbums>}
   * @memberof PlayerSpotifyArtistService
   */
  public getSingles(id: string, params: HttpParams = new HttpParams()): Observable<SpotifyAlbums> {
    const options: any = { observe: 'response'};
    const paramsWithLimit = new HttpParams({ fromString: params.toString() })
      .set('album_type', 'single')
      .set('market', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    options.params = paramsWithLimit;
    return this.http.get<SpotifyAlbums>(`${this.endpointUrl}/${id}/albums`, options)
      .map((event: HttpResponse<SpotifyAlbums>) => event.body);
  }
  /**
   * Get artists top tracks
   *
   * @param {string} id
   * @returns {Observable<SpotifySearch>}
   * @memberof PlayerSpotifyArtistService
   */
  public getTopTracks(id: string): Observable<SpotifySearch> {
    const options: any = { observe: 'response'};
    const params = new HttpParams()
      .set('country', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    options.params = params;
    return this.http.get<SpotifySearch>(`${this.endpointUrl}/${id}/top-tracks`, options)
      .map((event: HttpResponse<SpotifySearch>) => event.body);
  }
  /**
   * Get an artists related artists
   *
   * @param {string} id
   * @returns {Observable<SpotifySearch>}
   * @memberof PlayerSpotifyArtistService
   */
  public getRelatedArtists(id: string): Observable<SpotifySearch> {
    return this.http.get<SpotifySearch>(`${this.endpointUrl}/${id}/related-artists`);
  }
}

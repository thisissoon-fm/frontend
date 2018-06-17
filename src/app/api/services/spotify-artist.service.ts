import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SpotifySearch, SpotifyArtist, SpotifyAlbums } from '../models';

/**
 * Get artists data from player spotify api
 *
 * @export
 * @class SpotifyArtistService
 */
@Injectable()
export class SpotifyArtistService {
  /**
   * Spotify search endpoint
   *
   * @private
   * @memberof SpotifyArtistService
   */
  private endpointUrl = `${environment.apiUrlPlayer}spotify/artists`;
  /**
   * Creates an instance of SpotifyArtistService.
   * @param {HttpClient} http
   * @memberof SpotifyArtistService
   */
  constructor(private http: HttpClient) {}
  /**
   * Get artist detail data
   *
   * @param {string} id
   * @returns {Observable<SpotifyArtist>}
   * @memberof SpotifyArtistService
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
   * @memberof SpotifyArtistService
   */
  public getAlbums(
    id: string,
    params: HttpParams = new HttpParams()
  ): Observable<SpotifyAlbums> {
    const paramsWithLimit = new HttpParams({ fromString: params.toString() })
      .set('album_type', 'album')
      .set('market', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    const options: any = { observe: 'response', params: paramsWithLimit };
    return this.http
      .get<SpotifyAlbums>(`${this.endpointUrl}/${id}/albums`, options)
      .pipe(map((event: HttpResponse<SpotifyAlbums>) => event.body));
  }
  /**
   * Get list of artist singles
   *
   * @param {string} id
   * @param {HttpParams} [params=new HttpParams()]
   * @returns {Observable<SpotifyAlbums>}
   * @memberof SpotifyArtistService
   */
  public getSingles(
    id: string,
    params: HttpParams = new HttpParams()
  ): Observable<SpotifyAlbums> {
    const paramsWithLimit = new HttpParams({ fromString: params.toString() })
      .set('album_type', 'single')
      .set('market', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    const options: any = { observe: 'response', params: paramsWithLimit };
    return this.http
      .get<SpotifyAlbums>(`${this.endpointUrl}/${id}/albums`, options)
      .pipe(map((event: HttpResponse<SpotifyAlbums>) => event.body));
  }
  /**
   * Get artists top tracks
   *
   * @param {string} id
   * @returns {Observable<SpotifySearch>}
   * @memberof SpotifyArtistService
   */
  public getTopTracks(id: string): Observable<SpotifySearch> {
    const params = new HttpParams()
      .set('country', `${environment.spotifyMarket}`)
      .set('limit', `${environment.apiLimit}`);
    const options: any = { observe: 'response', params };
    return this.http
      .get<SpotifySearch>(`${this.endpointUrl}/${id}/top-tracks`, options)
      .pipe(
        map(
          (event: HttpResponse<SpotifySearch>) =>
            <any>{ tracks: { items: event.body.tracks } }
        )
      );
  }
  /**
   * Get an artists related artists
   *
   * @param {string} id
   * @returns {Observable<SpotifySearch>}
   * @memberof SpotifyArtistService
   */
  public getRelatedArtists(id: string): Observable<SpotifySearch> {
    return this.http
      .get<SpotifySearch>(`${this.endpointUrl}/${id}/related-artists`)
      .pipe(map(res => <any>{ artists: { items: res.artists } }));
  }
}

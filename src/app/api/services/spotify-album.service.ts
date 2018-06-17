import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { SpotifyAlbum, SpotifyTracks } from '../models';

/**
 * Get album data from player spotify api
 *
 * @export
 * @class SpotifyAlbumService
 */
@Injectable()
export class SpotifyAlbumService {
  /**
   * Spotify search endpoint
   *
   * @private
   * @memberof SpotifyAlbumService
   */
  private endpointUrl = `${environment.apiUrlPlayer}spotify/albums`;
  /**
   * Creates an instance of SpotifyAlbumService.
   * @param {HttpClient} http
   * @memberof SpotifyAlbumService
   */
  constructor(private http: HttpClient) {}
  /**
   * Get album detail data
   *
   * @param {string} id
   * @returns {Observable<SpotifyAlbum>}
   * @memberof SpotifyAlbumService
   */
  public get(id: string): Observable<SpotifyAlbum> {
    return this.http.get<SpotifyAlbum>(`${this.endpointUrl}/${id}`);
  }
  /**
   * Get list of artist albums
   *
   * @param {string} id
   * @param {HttpParams} [params=new HttpParams()]
   * @returns {Observable<SpotifyTracks>}
   * @memberof SpotifyAlbumService
   */
  public getTracks(
    id: string,
    params: HttpParams = new HttpParams()
  ): Observable<SpotifyTracks> {
    const paramsWithLimit = new HttpParams({
      fromString: params.toString()
    }).set('limit', `${environment.apiLimit}`);
    const options: any = { params: paramsWithLimit, observe: 'response' };
    return this.http
      .get<SpotifyTracks>(`${this.endpointUrl}/${id}/tracks`, options)
      .pipe(map((event: HttpResponse<SpotifyTracks>) => event.body));
  }
}

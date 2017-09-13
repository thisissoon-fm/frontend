import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { SpotifyAlbum, SpotifyTracks } from '../models';

/**
 * Get artists data from player spotify api
 *
 * @export
 * @class PlayerSpotifyAlbumService
 */
@Injectable()
export class PlayerSpotifyAlbumService {
  /**
   * Spotify search endpoint
   *
   * @private
   * @memberof PlayerSpotifyAlbumService
   */
  private endpointUrl = `${environment.apiUrlPlayer}spotify/albums`;
  /**
   * Market code to filter search results
   *
   * @private
   * @memberof PlayerSpotifyAlbumService
   */
  private readonly market = environment.spotifyMarket;
  /**
   * Creates an instance of PlayerSpotifyAlbumService.
   * @param {HttpClient} http
   * @memberof PlayerSpotifyAlbumService
   */
  constructor(private http: HttpClient) { }
  /**
   * Get album detail data
   *
   * @param {string} id
   * @returns {Observable<SpotifyAlbum>}
   * @memberof PlayerSpotifyAlbumService
   */
  public get(id: string): Observable<SpotifyAlbum> {
    return this.http.get<SpotifyAlbum>(`${this.endpointUrl}/${id}`);
  }
  /**
   * Get list of artist albums
   *
   * @param {string} id
   * @returns {Observable<SpotifyTracks>}
   * @memberof PlayerSpotifyAlbumService
   */
  public getTracks(id: string): Observable<SpotifyTracks> {
    return this.http.get<SpotifyTracks>(`${this.endpointUrl}/${id}/tracks`);
  }
}

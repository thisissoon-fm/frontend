import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { Volume } from '../models';

@Injectable()
export class PlayerVolumeService {
  /**
   * Volume endpoint url
   *
   * @private
   * @memberof PlayerVolumeService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/volume`;
  /**
   * Creates an instance of PlayerVolumeService.
   * @param {HttpClient} http
   * @memberof PlayerVolumeService
   */
  constructor(private http: HttpClient) { }
  /**
   * Get current volume value
   *
   * @returns {Observable<Volume>}
   * @memberof PlayerVolumeService
   */
  public get(): Observable<Volume> {
    return this.http.get<Volume>(this.endpointUrl);
  }
  /**
   * Change volume value the value of `volume`
   *
   * @param {Volume} volume
   * @returns {Observable<Volume>}
   * @memberof PlayerVolumeService
   */
  public post(volume: Volume): Observable<Volume> {
    return this.http.post<Volume>(this.endpointUrl, volume);
  }
}

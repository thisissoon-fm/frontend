import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Volume } from '../models';

@Injectable()
export class VolumeService {
  /**
   * Volume endpoint url
   *
   * @private
   * @memberof VolumeService
   */
  private endpointUrl = `${environment.apiUrlPlayer}player/volume`;
  /**
   * Creates an instance of VolumeService.
   * @param {HttpClient} http
   * @memberof VolumeService
   */
  constructor(private http: HttpClient) {}
  /**
   * Get current volume value
   *
   * @returns {Observable<Volume>}
   * @memberof VolumeService
   */
  public get(): Observable<Volume> {
    return this.http.get<Volume>(this.endpointUrl);
  }
  /**
   * Change volume value the value of `volume`
   *
   * @param {Volume} volume
   * @returns {Observable<Volume>}
   * @memberof VolumeService
   */
  public post(volume: Volume): Observable<Volume> {
    return this.http.post<Volume>(this.endpointUrl, volume);
  }
}

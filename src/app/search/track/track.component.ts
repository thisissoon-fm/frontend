import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SpotifyTrack } from '../../api';
import { UtilsService } from '../../shared';

@Component({
  selector: 'sfm-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  /**
   * Spotify track item to display
   *
   * @type {SpotifyTrack}
   * @memberof TrackComponent
   */
  @Input()
  public item: SpotifyTrack;
  /**
   * Position of image in array to display if available
   *
   * @type {number}
   * @memberof TrackComponent
   */
  @Input()
  public imageIndex = 0;
  /**
   * Outputs cta button click events
   *
   * @type {EventEmitter<string>}
   * @memberof TrackComponent
   */
  @Output()
  public onButtonClick: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof TrackComponent
   */
  public get optimalImage(): string {
    return this.utilsSvc.getOptimalImage(this.item.album.images, this.imageIndex);
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof TrackComponent
   */
  public get artistsJoined(): string {
    return this.utilsSvc.getArtistsJoined(this.item.artists);
  }
  /**
   * Creates an instance of TrackComponent.
   * @param {UtilsService} utilsSvc
   * @memberof TrackComponent
   */
  constructor(public utilsSvc: UtilsService) { }
  /**
   * Emit event to parent component
   *
   * @memberof TrackComponent
   */
  public onClick(): void {
    this.onButtonClick.emit(this.item.uri);
  }
}

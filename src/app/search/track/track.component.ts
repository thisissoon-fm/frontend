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
  @Input() public item: SpotifyTrack;
  /**
   * Position of image in array to display if available
   *
   * @type {number}
   * @memberof TrackComponent
   */
  @Input() public imageIndex = 0;
  /**
   * If true will render a smaller version of track component
   *
   * @type {boolean}
   * @memberof TrackComponent
   */
  @Input() public small = false;
  /**
   * Hide artist info
   *
   * @memberof TrackComponent
   */
  @Input() public hideArtist = false;
  /**
   * Hide album info
   *
   * @memberof TrackComponent
   */
  @Input() public hideAlbum = false;
  /**
   * If true means the component is on a dark background
   *
   * @type {boolean}
   * @memberof TrackComponent
   */
  @Input() public dark = false;
  /**
   * If true means track has been added to queue
   *
   * @type {boolean}
   * @memberof TrackComponent
   */
  public added = false;
  /**
   * Outputs cta button click events
   *
   * @type {EventEmitter<string>}
   * @memberof TrackComponent
   */
  @Output() public buttonClick = new EventEmitter<string>();
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof TrackComponent
   */
  public get optimalImage(): string {
    if (this.item.album && this.item.album.images) {
      return this.utilsSvc.getOptimalImage(
        this.item.album.images,
        this.imageIndex
      );
    }
    return '';
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
  constructor(public utilsSvc: UtilsService) {}
  /**
   * Emit event to parent component
   *
   * @memberof TrackComponent
   */
  public onClick(): void {
    this.added = true;
    this.buttonClick.emit(this.item.uri);
  }
}

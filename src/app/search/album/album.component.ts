import { Component, Input } from '@angular/core';

import { SpotifyAlbum } from '../../api';
import { UtilsService } from '../../shared';

@Component({
  selector: 'sfm-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  /**
   * Position of image in array to display if available
   *
   * @type {number}
   * @memberof AlbumComponent
   */
  @Input()
  public imageIndex = 0;
  /**
   * Spotify track item to display
   *
   * @type {SpotifyTrack}
   * @memberof AlbumComponent
   */
  @Input()
  public item: SpotifyAlbum;
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof AlbumComponent
   */
  public get optimalImage(): string {
    return this.utilsSvc.getOptimalImage(this.item.images, this.imageIndex);
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof AlbumComponent
   */
  public get artistsJoined(): string {
    return (this.item && this.item.artists) ?
      this.utilsSvc.getArtistsJoined(this.item.artists) : '';
  }
  /**
   * Creates an instance of AlbumComponent.
   * @param {UtilsService} utilsSvc
   * @memberof AlbumComponent
   */
  constructor(public utilsSvc: UtilsService) { }
}

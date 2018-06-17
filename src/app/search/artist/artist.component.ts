import { Component, Input } from '@angular/core';

import { SpotifyArtist } from '../../api';
import { UtilsService } from '../../shared';

@Component({
  selector: 'sfm-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent {
  /**
   * Position of image in array to display if available
   *
   * @type {number}
   * @memberof ArtistComponent
   */
  @Input() public imageIndex = 0;
  /**
   * Spotify track item to display
   *
   * @type {SpotifyTrack}
   * @memberof ArtistComponent
   */
  @Input() public item: SpotifyArtist;
  /**
   * If true means item is on a dark background
   *
   * @type {boolean}
   * @memberof AlbumComponent
   */
  @Input() public dark = false;
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof ArtistComponent
   */
  public get optimalImage(): string {
    return this.utilsSvc.getOptimalImage(this.item.images, this.imageIndex);
  }
  /**
   * Creates an instance of ArtistComponent.
   * @param {UtilsService} utilsSvc
   * @memberof ArtistComponent
   */
  constructor(public utilsSvc: UtilsService) {}
}

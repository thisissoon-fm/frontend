import { Injectable } from '@angular/core';

import { Image, Artist } from '../../api';

/**
 * Service with generic helper functions
 *
 * @export
 * @class UtilsService
 */
@Injectable()
export class UtilsService {
  /**
   * Returns image for `index` or last image in array if
   * image at `index` does not exist
   *
   * @param {Image[]} images
   * @param {number} index
   * @returns {string}
   * @memberof UtilsService
   */
  public getOptimalImage(images: Image[], index: number): string {
    if (images && images.length) {
      const goodImages = images.slice(0, index + 1);
      const lastIndex = goodImages.length - 1;
      return goodImages[lastIndex].url;
    }
    return '';
  }
  /**
   * Returns list of artists as a string separated by `, `
   *
   * @param {Artist[]} artists
   * @returns {string}
   * @memberof UtilsService
   */
  public getArtistsJoined(artists: Artist[]): string {
    if (artists && artists.length) {
      return artists.map((artist) => artist.name).join(', ');
    }
    return '';
  }

}

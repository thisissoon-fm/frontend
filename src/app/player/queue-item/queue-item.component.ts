import { Component, Input } from '@angular/core';

import { QueueItem } from '../../api';
import { UtilsService } from '../../shared';

@Component({
  selector: 'sfm-queue-item',
  templateUrl: './queue-item.component.html',
  styleUrls: ['./queue-item.component.scss']
})
export class QueueItemComponent {
  /**
   * Queue item
   *
   * @type {QueueItem}
   * @memberof QueueItemComponent
   */
  @Input('item')
  public item: QueueItem;
  /**
   * Position of image in array to display if available
   *
   * @type {number}
   * @memberof QueueItemComponent
   */
  @Input()
  public imageIndex = 0;
  /**
   * If false will hide track album image
   *
   * @memberof QueueItemComponent
   */
  @Input()
  public displayImage = true;
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public get optimalImage(): string {
    return this.utilsSvc.getOptimalImage(this.item.track.album.images, this.imageIndex);
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public get artistsJoined(): string {
    return this.utilsSvc.getArtistsJoined(this.item.track.artists);
  }
  /**
   * Creates an instance of QueueItemComponent.
   * @param {SharedModule} utilsSvc
   * @memberof QueueItemComponent
   */
  constructor(public utilsSvc: UtilsService) { }
}

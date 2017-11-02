import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUserStore from '../../user/store';
import * as fromPlayerStore from '../../player/store';
import { QueueItem, Artist } from '../../api';
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
   * If true means user can delete track
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof QueueItemComponent
   */
  public get canDelete(): Observable<boolean> {
    return this.userStore$.select(fromUserStore.getUser)
      .map((user) => (user && this.item) ? (user.id === this.item.user.id && !this.item.player) : false);
  }
  /**
   * Returns optimal image or last image in array if
   * optimal image does not exist
   *
   * @readonly
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public get optimalImage(): string {
    return this.item && this.item.track && this.item.track.album && this.item.track.album.images ?
      this.utilsSvc.getOptimalImage(this.item.track.album.images, this.imageIndex) : '';
  }
  /**
   * Return artists as a string of names
   *
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public get artistsJoined(): string {
    return this.item && this.item.track && this.item.track.artists ?
      this.utilsSvc.getArtistsJoined(this.item.track.artists) : '';
  }
  /**
   * Returns the uri of the track album without the "spotify:album:" prefix
   *
   * @param {Artist} artist
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public get albumUri(): string {
    const uriSplit = this.item ? this.item.track.album.uri.split(':') : [];
    const last = uriSplit.length - 1;
    return uriSplit[last];
  }
  /**
   * Creates an instance of QueueItemComponent.
   * @param {SharedModule} utilsSvc
   * @memberof QueueItemComponent
   */
  constructor(
    private utilsSvc: UtilsService,
    private userStore$: Store<fromUserStore.UserState>,
    private playerStore$: Store<fromPlayerStore.PlayerState>
  ) { }
  /**
   * Returns the uri of the artist without the "spotify:artist:" prefix
   *
   * @param {Artist} artist
   * @returns {string}
   * @memberof QueueItemComponent
   */
  public getArtistUri(artist: Artist): string {
    const uriSplit = artist.uri.split(':');
    const last = uriSplit.length - 1;
    return uriSplit[last];
  }
  /**
   * Remove track from queue
   *
   * @memberof QueueItemComponent
   */
  public delete(): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueRemove(this.item.uuid));
  }
}

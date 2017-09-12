import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { QueueItem } from './api';
import * as fromStore from './store';
import { EventService, PlayerEvent } from './event';
import { View, UtilsService } from './shared';

/**
 * Root component of application, this component should be present
 * inside `src/index.html`. Contains most of the logic for getting
 * data and syncing with the api
 *
 * @example
 * ```
 * <sfm-root></sfm-root>
 * ```
 *
 * @export
 * @class AppComponent
 * @implements {OnInit, OnDestroy}
 */
@Component({
  selector: 'sfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Observable of the item currently playing in the player
   *
   * @type {Observable<QueueItem>}
   * @memberof AppComponent
   */
  public current$: Observable<QueueItem>;
  /**
   * Observable of list of items in the queue
   *
   * @type {Observable<QueueItem[]>}
   * @memberof AppComponent
   */
  public queue$: Observable<QueueItem[]>;
  /**
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof AppComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
  /**
   * Specifies the current view in the sidebar
   *
   * @type {Observable<View>}
   * @memberof AppComponent
   */
  public view$: Observable<View>;
  /**
   * Store `View` enum as a property in the component
   * to use in template
   *
   * @memberof AppComponent
   */
  public view = View;
  /**
   * Returns current image or empty string
   *
   * @readonly
   * @type {string}
   * @memberof AppComponent
   */
  public get currentImage$(): Observable<string> {
    return this.current$
      .map((current) => {
        return (current && current.track) ?
           this.utilsSvc.getOptimalImage(current.track.album.images, 0) : '';
      });
  }
  /**
   * Creates an instance of AppComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @param {EventService} eventSvc
   * @param {UtilsService} utilsSvc
   * @memberof AppComponent
   */
  constructor(
    private store: Store<fromStore.PlayerState>,
    private eventSvc: EventService,
    private utilsSvc: UtilsService
  ) { }
  /**
   * Tell store to load player data from api and subscribe to
   * their latest values from the store
   *
   * @memberof AppComponent
   */
  public ngOnInit(): void {
    this.current$ = this.store.select(fromStore.getCurrent);
    this.queue$ = this.store.select(fromStore.getQueue);
    this.view$ = this.store.select(fromStore.getView);

    this.store.dispatch(new fromStore.LoadCurrent());
    this.store.dispatch(new fromStore.LoadQueue());
    this.store.dispatch(new fromStore.LoadVolume());
    this.store.dispatch(new fromStore.LoadMute());
    this.store.dispatch(new fromStore.LoadQueueMeta());

    this.eventSvc.messages$
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((event) => this.onEvent(event));
  }
  /**
   * Event handler for events from socket.io event service
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onEvent(data: PlayerEvent): void {
    switch (data.event) {
      case 'add':
        this.onAdd(data);
        break;
      case 'end':
      case 'stop':
        this.onEnd();
        break;
      case 'pause':
        this.onPause();
        break;
      case 'resume':
        this.onResume();
        break;
      case 'play':
        this.onPlay();
        break;
      case 'deleted':
        this.onDelete(data);
        break;
      case 'set_volume':
        this.onVolumeChanged(data);
        break;
      case 'set_mute':
        this.onMuteChanged(data);
        break;
    }
  }
  /**
   * Load queue item by loading track and user data
   * and joining them to create a new QueueItem
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onAdd(data: PlayerEvent): void {
    this.store.dispatch(new fromStore.LoadQueueItem(data));
  }
  /**
   * Removes track from queue
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onDelete(data: PlayerEvent): void {
    this.store.dispatch(new fromStore.QueueRemoveSuccess(data.uuid));
  }
  /**
   * Remove first queue item from playlist and load the current track
   *
   * @memberof AppComponent
   */
  public onPlay(): void {
    this.store.dispatch(new fromStore.QueueShift());
    this.store.dispatch(new fromStore.LoadCurrent());
  }
  /**
   * Remove current track data from store
   *
   * @memberof AppComponent
   */
  public onEnd(): void {
    this.store.dispatch(new fromStore.RemoveCurrentSuccess(null));
  }
  /**
   * Stop timer and update pause status
   *
   * @memberof AppComponent
   */
  public onPause(): void {
    this.store.dispatch(new fromStore.AddPauseSuccess(null));
  }
  /**
   * Restart timer and update pause status
   *
   * @memberof AppComponent
   */
  public onResume(): void {
    this.store.dispatch(new fromStore.RemovePauseSuccess(null));
  }
  /**
   * Set mute status
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onMuteChanged(data: PlayerEvent): void {
    if (data.mute) {
      this.store.dispatch(new fromStore.AddMuteSuccess({ mute: data.mute }));
    } else {
      this.store.dispatch(new fromStore.RemoveMuteSuccess({ mute: data.mute }));
    }
  }
  /**
   * Set volume level
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onVolumeChanged(data: PlayerEvent): void {
    this.store.dispatch(new fromStore.SetVolumeSuccess({ volume: data.volume }));
  }
  /**
   * Unsubscribe from infinite observable on destroy
   *
   * @memberof AppComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}

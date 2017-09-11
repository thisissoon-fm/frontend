import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { QueueItem, Mute, Volume, QueueMeta, SearchType } from './api';
import * as fromStore from './store';
import { EventService, PlayerEvent } from './event';
import { View } from './shared';

/**
 * Root component of application, this component should be present
 * inside `src/index.html`
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
   * Observable of volume object that contains
   * the current volume value
   *
   * @type {Observable<Volume>}
   * @memberof AppComponent
   */
  public volume$: Observable<Volume>;
  /**
   * Observable of mute object that contains
   * the current mute status value
   *
   * @type {Observable<Mute>}
   * @memberof AppComponent
   */
  public mute$: Observable<Mute>;
  /**
   * Observable of queue meta infomation such as
   * current genres and most active user
   *
   * @type {Observable<QueueMeta>}
   * @memberof AppComponent
   */
  public meta$: Observable<QueueMeta>;
  /**
   * Observable that emits and event when volume is changed
   * using the `[input="range"]` slider
   *
   * @type {Subject<number>}
   * @memberof AppComponent
   */
  public onVolumeChange$: Subject<number> = new Subject<number>();
  /**
   * Interval observable that will update track timer when track is playing
   *
   * @type {Subscription}
   * @memberof AppComponent
   */
  public currentTimerSub$: Subscription;
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
   * Store `view` enum as a property in the component
   * to use in template
   *
   * @memberof AppComponent
   */
  public view = View;
  /**
   * Creates an instance of AppComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @memberof AppComponent
   */
  constructor(
    private store: Store<fromStore.PlayerState>,
    private eventSvc: EventService
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
    this.volume$ = this.store.select(fromStore.getVolume);
    this.mute$ = this.store.select(fromStore.getMute);
    this.meta$ = this.store.select(fromStore.getQueueMeta);
    this.view$ = this.store.select(fromStore.getView);


    this.store.dispatch(new fromStore.LoadCurrent());
    this.store.dispatch(new fromStore.LoadQueue());
    this.store.dispatch(new fromStore.LoadVolume());
    this.store.dispatch(new fromStore.LoadMute());
    this.store.dispatch(new fromStore.LoadQueueMeta());

    this.startTimer();

    this.onVolumeChange$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(100)
      .subscribe((vol) => this.setVolume(vol));

    this.eventSvc.messages$
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((event) => this.onEvent(event));
  }
  /**
   * Event handler for volume input, send next value
   * to `onVolumeChange$` observable
   *
   * @param {Event} event
   * @memberof AppComponent
   */
  public onVolumeInputChange(event: Event): void {
    const volume = parseInt((<HTMLInputElement>event.target).value, 10);
    // Update UI instantly while we wait for request to go through
    this.store.dispatch(new fromStore.SetVolumeSuccess({ volume }));
    this.onVolumeChange$.next(volume);
  }
  /**
   * Sends requests to api to toggle pause status
   *
   * @memberof AppComponent
   */
  public togglePause(): void {
    this.current$
      .take(1)
      .subscribe((current) =>
        current.paused ?
        this.store.dispatch({ type: fromStore.REMOVE_PAUSE }) :
        this.store.dispatch({ type: fromStore.ADD_PAUSE }));
  }
  /**
   * Sends requests to api to toggle mute status
   *
   * @memberof AppComponent
   */
  public toggleMute(): void {
    this.mute$
      .take(1)
      .subscribe((mute) =>
        mute.mute ?
        this.store.dispatch(new fromStore.RemoveMute()) :
        this.store.dispatch(new fromStore.AddMute()));
  }
  /**
   * Send request to skip the currently playing track
   *
   * @memberof AppComponent
   */
  public skip(): void {
    this.store.dispatch(new fromStore.RemoveCurrent());
  }
  /**
   * Send request to set player volume
   *
   * @param {number} volume
   * @memberof AppComponent
   */
  public setVolume(volume: number): void {
    this.store.dispatch(new fromStore.SetVolume({ volume }));
  }
  /**
   * Set sidebar view
   *
   * @param {View} view
   * @memberof AppComponent
   */
  public setView(view: View): void {
    this.store.dispatch(new fromStore.SetView(view));
  }
  /**
   * Event handler for events from socket.io event service
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onEvent(data: PlayerEvent): void {
    console.log(`event ${JSON.stringify(data)}`);
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
    this.stopTimer();
    this.store.dispatch(new fromStore.RemoveCurrentSuccess(null));
  }
  /**
   * Stop timer and update pause status
   *
   * @memberof AppComponent
   */
  public onPause(): void {
    this.stopTimer();
    this.store.dispatch(new fromStore.AddPauseSuccess(null));
  }
  /**
   * Restart timer and update pause status
   *
   * @memberof AppComponent
   */
  public onResume(): void {
    this.startTimer();
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
   * Start/Resume track timer
   *
   * @private
   * @memberof AppComponent
   */
  private startTimer(): void {
    this.current$
      .filter((current) => !!(current && current.player))
      .take(1)
      .subscribe((current) => {
        this.stopTimer();
        this.currentTimerSub$ = Observable.interval(1000)
          .takeUntil(this.ngUnsubscribe$)
          .subscribe(() => {
            if (current.player.elapsed_time >= current.track.duration) {
              this.stopTimer();
              this.onEnd();
              return;
            }
            this.store.dispatch(new fromStore.TimerIncrement());
          });
    });
  }
  /**
   * Pause/stop track timer
   *
   * @private
   * @memberof AppComponent
   */
  private stopTimer(): void {
    if (this.currentTimerSub$ && this.currentTimerSub$.unsubscribe) {
      this.currentTimerSub$.unsubscribe();
    }
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

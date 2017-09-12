import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { QueueItem, Volume, Mute, QueueMeta } from '../../api';
import * as fromStore from '../../store';
import { EventService, PlayerEvent } from '../../event';

/**
 * Displays current track and player controls
 *
 * @export
 * @class NowPlayingComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'sfm-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  /**
   * Observable of the item currently playing in the player
   *
   * @type {Observable<QueueItem>}
   * @memberof NowPlayingComponent
   */
  public current$: Observable<QueueItem>;
  /**
   * Observable of volume object that contains
   * the current volume value
   *
   * @type {Observable<Volume>}
   * @memberof NowPlayingComponent
   */
  public volume$: Observable<Volume>;
  /**
   * Observable of mute object that contains
   * the current mute status value
   *
   * @type {Observable<Mute>}
   * @memberof NowPlayingComponent
   */
  public mute$: Observable<Mute>;
  /**
   * Observable of queue meta infomation such as
   * current genres and most active user
   *
   * @type {Observable<QueueMeta>}
   * @memberof NowPlayingComponent
   */
  public meta$: Observable<QueueMeta>;
  /**
   * Observable that emits and event when volume is changed
   * using the `[input="range"]` slider
   *
   * @type {Subject<number>}
   * @memberof NowPlayingComponent
   */
  public onVolumeChange$: Subject<number> = new Subject<number>();
  /**
   * Interval observable that will update track timer when track is playing
   *
   * @type {Subscription}
   * @memberof NowPlayingComponent
   */
  public currentTimerSub$: Subscription;
  /**
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof NowPlayingComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
  /**
   * Creates an instance of NowPlayingComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @param {EventService} eventSvc
   * @memberof NowPlayingComponent
   */
 constructor(
   private store: Store<fromStore.PlayerState>,
   private eventSvc: EventService
 ) { }
  /**
   * Tell store to load player data from api and subscribe to
   * their latest values from the store
   *
   * @memberof NowPlayingComponent
   */
  public ngOnInit(): void {
    this.current$ = this.store.select(fromStore.getCurrent);
    this.volume$ = this.store.select(fromStore.getVolume);
    this.mute$ = this.store.select(fromStore.getMute);
    this.meta$ = this.store.select(fromStore.getQueueMeta);

    this.onVolumeChange$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(100)
      .subscribe((vol) => this.setVolume(vol));

    this.eventSvc.messages$
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((event) => this.onEvent(event));

    this.startTimer();
  }
  /**
   * Event handler for volume input, send next value
   * to `onVolumeChange$` observable
   *
   * @param {Event} event
   * @memberof NowPlayingComponent
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
   * @memberof NowPlayingComponent
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
   * @memberof NowPlayingComponent
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
   * @memberof NowPlayingComponent
   */
  public skip(): void {
    this.store.dispatch(new fromStore.RemoveCurrent());
  }
  /**
   * Send request to set player volume
   *
   * @param {number} volume
   * @memberof NowPlayingComponent
   */
  public setVolume(volume: number): void {
    this.store.dispatch(new fromStore.SetVolume({ volume }));
  }
  /**
   * Event handler for events from socket.io event service
   *
   * @param {PlayerEvent} data
   * @memberof NowPlayingComponent
   */
  public onEvent(data: PlayerEvent): void {
    switch (data.event) {
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
    }
  }
  /**
   * Remove current track data from store
   *
   * @memberof NowPlayingComponent
   */
  public onEnd(): void {
    this.stopTimer();
  }
  /**
   * Stop timer and update pause status
   *
   * @memberof NowPlayingComponent
   */
  public onPause(): void {
    this.stopTimer();
  }
  /**
   * Restart timer and update pause status
   *
   * @memberof NowPlayingComponent
   */
  public onResume(): void {
    this.startTimer();
  }
  /**
   * Start/Resume track timer
   *
   * @private
   * @memberof NowPlayingComponent
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
            } else {
              this.store.dispatch(new fromStore.TimerIncrement());
            }
          });
    });
  }
  /**
   * Pause/stop track timer
   *
   * @private
   * @memberof NowPlayingComponent
   */
  private stopTimer(): void {
    if (this.currentTimerSub$ && this.currentTimerSub$.unsubscribe) {
      this.currentTimerSub$.unsubscribe();
    }
  }
  /**
   * Unsubscribe from infinite observable on destroy
   *
   * @memberof NowPlayingComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}

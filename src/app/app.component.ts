import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { QueueItem, Mute, Volume, QueueMeta } from './api';
import * as fromStore from './store';

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
 * @implements {OnInit}
 */
@Component({
  selector: 'sfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Observable of the item currently player in the player
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
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof AppComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
  /**
   * Creates an instance of AppComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @memberof AppComponent
   */
  constructor(private store: Store<fromStore.PlayerState>) { }
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

    this.store.dispatch(new fromStore.LoadCurrent());
    this.store.dispatch(new fromStore.LoadQueue());
    this.store.dispatch(new fromStore.LoadVolume());
    this.store.dispatch(new fromStore.LoadMute());
    this.store.dispatch(new fromStore.LoadQueueMeta());

    this.onVolumeChange$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(300)
      .subscribe((vol) => this.setVolume(vol));
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
   * @param {any} $event
   * @memberof AppComponent
   */
  public setVolume($event): void {
    const volume = parseInt($event.target.value, 10);
    this.store.dispatch(new fromStore.SetVolume({ volume }));
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}

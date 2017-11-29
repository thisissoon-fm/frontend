import { Component, OnInit, OnDestroy, HostBinding, Inject, Renderer2 } from '@angular/core';
import { Router, NavigationStart, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from './player/store';
import * as fromSharedStore from './shared/store';
import * as fromUserStore from './user/store';
import * as fromSearchStore from './search/store';
import { EventService, PlayerEvent } from './event';
import { navFadeAnimation, routeAnimation } from './shared/';
import { CurrentService, QueueService } from './api';

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
  styleUrls: ['./app.component.scss'],
  animations: [
    navFadeAnimation,
    routeAnimation
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * If true means the app is currently on the loading page
   *
   * @memberof AppComponent
   */
  @HostBinding('class.is-loading-page')
  public isLoadingPage = false;
  /**
   * If true means the search view is current active
   *
   * @memberof AppComponent
   */
  @HostBinding('class.is-search-page')
  public isSearchPage = false;
  /**
   * If true means the artist or album page is currently active
   *
   * @memberof AppComponent
   */
  @HostBinding('class.is-search-detail-page')
  public isSearchDetailPage = false;
  /**
   * If true means the search router is active
   *
   * @memberof AppComponent
   */
  @HostBinding('class.is-router-search-active')
  public isSearchRouterActive = false;
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
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {Store<fromSharedStore.SharedState>} sharedStore$
   * @param {Store<fromSearchStore.SharedState>} searchStore$
   * @param {Store<fromUserStore.UserState>} userStore$
   * @param {Router} router
   * @param {EventService} eventSvc
   * @param {currentSvc} currentService
   * @param {queueSvc} queueService
   * @param {Renderer2} render
   * @param {any} doc
   * @memberof AppComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private sharedStore$: Store<fromSharedStore.SharedState>,
    private searchStore$: Store<fromSearchStore.SearchState>,
    private userStore$: Store<fromUserStore.UserState>,
    private router: Router,
    private eventSvc: EventService,
    private currentSvc: CurrentService,
    private queueSvc: QueueService,
    private render: Renderer2,
    @Inject(DOCUMENT) private doc
  ) { }
  /**
   * Tell store to load player data from api and subscribe to
   * their latest values from the store
   *
   * @memberof AppComponent
   */
  public ngOnInit(): void {
    this.router.navigate(['/']);

    this.router.events
      .filter((event) => event instanceof NavigationStart)
      .delay(0)
      .subscribe((event: NavigationStart) => {
        this.isLoadingPage = (event.url === '/');
        this.isSearchPage = event.url.includes('(search:search)');
        this.isSearchDetailPage = event.url.includes('(search:artists') || event.url.includes('(search:albums');
        this.isSearchRouterActive = event.url.includes('(search');
        this.sharedStore$.dispatch(new fromSharedStore.SetSearchPageActive(this.isSearchPage));
        this.sharedStore$.dispatch(new fromSharedStore.SetRouterSearchActive(this.isSearchRouterActive));
        this.sharedStore$.dispatch(new fromSharedStore.SetSearchDetailPageActive(this.isSearchDetailPage));
      });


    this.loadPlayerData();
    this.userStore$.dispatch(new fromUserStore.LoadMe());

    this.eventSvc.messages$
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((event) => this.onEvent(event));

    this.render.listen(this.doc, 'visibilitychange', () => {
      if (this.doc['visibilityState'] === 'visible') {
        this.checkPlayerDataInSync();
      }
    });
  }
  /**
   * Checks if player data is in sync else it refreshes all data
   *
   * @memberof AppComponent
   */
  public checkPlayerDataInSync(): void {
    const currentFromApi$ = this.currentSvc.get();
    const currentFromClient$ = this.playerStore$.select(fromPlayerStore.getCurrent);

    const metaFromApi$ = this.queueSvc.getMeta();
    const metaFromClient$ = this.playerStore$.select(fromPlayerStore.getQueueMeta);

    const currentCombined$ = Observable.combineLatest(currentFromApi$, currentFromClient$)
      .take(1)
      .map(([currentFromApi, currentFromClient]) => {
        const currentFromClientId = currentFromClient && currentFromClient.track ? currentFromClient.track.id : null;
        const currentFromApiId = currentFromApi && currentFromApi.track ? currentFromApi.track.id : null;
        return currentFromClientId !== currentFromApiId;
      });

    const metaCombined$ = Observable.combineLatest(metaFromApi$, metaFromClient$)
      .take(1)
      .map(([metaFromApi, metaFromClient]) => {
        const metaFromClientPlayTime = metaFromClient ? metaFromClient.play_time : null;
        const metaFromApiPlayTime = metaFromApi ? metaFromApi.play_time : null;
        return metaFromClientPlayTime !== metaFromApiPlayTime;
      });

    Observable.combineLatest(currentCombined$, metaCombined$)
      .take(1)
      .filter(([currentDoesntMatch, metaDoesntMatch]) => currentDoesntMatch || metaDoesntMatch)
      .subscribe(() => this.loadPlayerData());
  }
  /**
   * Load all data for player
   *
   * @memberof AppComponent
   */
  public loadPlayerData() {
    this.playerStore$.dispatch(new fromPlayerStore.LoadCurrent());
    this.playerStore$.dispatch(new fromPlayerStore.LoadQueue());
    this.playerStore$.dispatch(new fromPlayerStore.LoadVolume());
    this.playerStore$.dispatch(new fromPlayerStore.LoadMute());
    this.playerStore$.dispatch(new fromPlayerStore.LoadQueueMeta());
    this.playerStore$.dispatch(new fromPlayerStore.LoadStats());
  }
  /**
   * Return route meta data for router animation
   *
   * @param {RouterOutlet} outlet
   * @returns {('splashPage' | 'homePage')}
   * @memberof AppComponent
   */
  public prepRouteState(outlet: RouterOutlet): 'splashPage' | 'homePage'  {
    return outlet.activatedRouteData['animation'] || 'homePage';
  }
  /**
   * Close search if it's open
   *
   * @memberof AppComponent
   */
  public closeSearch(): void {
    if (this.isSearchRouterActive) {
      this.router.navigate(['/home']);
      this.searchStore$.dispatch(new fromSearchStore.ClearSearch());
    }
  }
  /**
   * Close search if it's open
   *
   * @memberof AppComponent
   */
  public closeSearchDetail(): void {
    if (this.isSearchDetailPage) {
      this.router.navigate(['/home', { outlets: { search: ['search'] } }]);
    }
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
    this.playerStore$.dispatch(new fromPlayerStore.LoadQueueItem(data));
  }
  /**
   * Removes track from queue
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onDelete(data: PlayerEvent): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueRemoveSuccess(data.uuid));
  }
  /**
   * Remove first queue item from playlist and load the current track
   *
   * @memberof AppComponent
   */
  public onPlay(): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueShift());
    this.playerStore$.dispatch(new fromPlayerStore.LoadCurrent());
  }
  /**
   * Remove current track data from store
   *
   * @memberof AppComponent
   */
  public onEnd(): void {
    this.playerStore$.dispatch(new fromPlayerStore.RemoveCurrentSuccess(null));
  }
  /**
   * Stop timer and update pause status
   *
   * @memberof AppComponent
   */
  public onPause(): void {
    this.playerStore$.dispatch(new fromPlayerStore.AddPauseSuccess(null));
  }
  /**
   * Restart timer and update pause status
   *
   * @memberof AppComponent
   */
  public onResume(): void {
    this.playerStore$.dispatch(new fromPlayerStore.RemovePauseSuccess(null));
  }
  /**
   * Set mute status
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onMuteChanged(data: PlayerEvent): void {
    if (data.mute) {
      this.playerStore$.dispatch(new fromPlayerStore.AddMuteSuccess({ mute: data.mute }));
    } else {
      this.playerStore$.dispatch(new fromPlayerStore.RemoveMuteSuccess({ mute: data.mute }));
    }
  }
  /**
   * Set volume level
   *
   * @param {PlayerEvent} data
   * @memberof AppComponent
   */
  public onVolumeChanged(data: PlayerEvent): void {
    this.playerStore$.dispatch(new fromPlayerStore.SetVolumeSuccess({ volume: data.volume }));
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

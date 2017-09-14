import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { QueueItem } from '../api';
import * as fromPlayerStore from '../player/store';
import * as fromSharedStore from '../shared/store';
import { EventService, PlayerEvent } from '../event';
import { CenterView, UtilsService } from '../shared';

@Component({
  selector: 'sfm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Observable of the item currently playing in the player
   *
   * @type {Observable<QueueItem>}
   * @memberof HomeComponent
   */
  public current$: Observable<QueueItem>;
  /**
   * Observable of list of items in the queue
   *
   * @type {Observable<QueueItem[]>}
   * @memberof HomeComponent
   */
  public queue$: Observable<QueueItem[]>;
  /**
   * Specifies the current view in the center section
   *
   * @type {Observable<fromSharedStore.ViewState>}
   * @memberof HomeComponent
   */
  public view$: Observable<fromSharedStore.ViewState>;
  /**
   * Store `CenterView` enum as a property in the component
   * to use in template
   *
   * @memberof HomeComponent
   */
  public centerView = CenterView;
  /**
   * Returns current image or empty string
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof HomeComponent
   */
  public get currentImage$(): Observable<string> {
    return this.current$
      .map((current) =>
        (current && current.track) ?
           this.utilsSvc.getOptimalImage(current.track.album.images, 0) : ''
      );
  }
  /**
   * Returns true if right view is open
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof HomeComponent
   */
  public get rightViewOpen$(): Observable<boolean> {
    return this.view$
      .map((view) => view.rightViewOpen);
  }
  /**
   * Creates an instance of HomeComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {Store<fromSharedStore.SharedState>} sharedStore$
   * @param {UtilsService} utilsSvc
   * @memberof HomeComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private sharedStore$: Store<fromSharedStore.SharedState>,
    private utilsSvc: UtilsService
  ) { }
  /**
   * Tell store to load player data from api and subscribe to
   * their latest values from the store
   *
   * @memberof HomeComponent
   */
  public ngOnInit(): void {
    this.current$ = this.playerStore$.select(fromPlayerStore.getCurrent);
    this.queue$ = this.playerStore$.select(fromPlayerStore.getQueue);
    this.view$ = this.sharedStore$.select(fromSharedStore.getViewState);
  }
}

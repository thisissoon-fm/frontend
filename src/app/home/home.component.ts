import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../player/store';
import { QueueItem } from '../api';
import { UtilsService } from '../shared';

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
   * Returns current image or empty string
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof HomeComponent
   */
  public get currentImage$(): Observable<string> {
    return this.current$.pipe(
      map(
        current =>
          current && current.track
            ? this.utilsSvc.getOptimalImage(current.track.album.images, 0)
            : ''
      )
    );
  }
  /**
   * Creates an instance of HomeComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {UtilsService} utilsSvc
   * @memberof HomeComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private utilsSvc: UtilsService
  ) {}
  /**
   * Tell store to load player data from api and subscribe to
   * their latest values from the store
   *
   * @memberof HomeComponent
   */
  public ngOnInit(): void {
    this.current$ = this.playerStore$.select(fromPlayerStore.getCurrent);
    this.queue$ = this.playerStore$.select(fromPlayerStore.getQueue);
  }
}

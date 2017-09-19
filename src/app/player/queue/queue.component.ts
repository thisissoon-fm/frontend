import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { QueueItem, Pagination } from '../../api';
import * as fromPlayerStore from '../store';
import { QueueState } from '../store/reducers/queue.reducer';

@Component({
  selector: 'sfm-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  /**
   * Observable of list of items in the queue
   *
   * @type {Observable<QueueState>}
   * @memberof QueueComponent
   */
  public queue$: Observable<QueueState>;
  /**
   * Pagination data for soon fm queue
   *
   * @type {Observable<Pagination>}
   * @memberof QueueComponent
   */
  public pagination$: Observable<Pagination>;
  /**
   * Returns true if all tracks have been loaded
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof QueueComponent
   */
  public get allTracksLoaded(): Observable<boolean> {
    return this.queue$.combineLatest(this.pagination$)
      .map((data) => {
        const queue = data[0];
        const pagination = data[1];
        return (pagination.currentPage >= pagination.totalPages);
      });
  }
  /**
   * Creates an instance of QueueComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @memberof QueueComponent
   */
  constructor(private playerStore$: Store<fromPlayerStore.PlayerState>) { }
  /**
   * Subscribe to queue
   *
   * @memberof QueueComponent
   */
  public ngOnInit(): void {
    this.queue$ = this.playerStore$.select(fromPlayerStore.getQueueState);
    this.pagination$ = this.playerStore$.select(fromPlayerStore.getQueuePagination);
  }
  /**
   * On scroll end load more tracks if needed
   *
   * @memberof QueueComponent
   */
  public onScrollEnd(): void {
    this.playerStore$.dispatch(new fromPlayerStore.LoadNextQueuePage());
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { QueueItem, Pagination } from '../../api';
import { fadeMoveUpAnimation } from '../../shared/animations';
import * as fromPlayerStore from '../store';

@Component({
  selector: 'sfm-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  animations: [fadeMoveUpAnimation]
})
export class QueueComponent implements OnInit {
  /**
   * list of items in the queue
   *
   * @type {QueueItem[]}
   * @memberof QueueComponent
   */
  public queue: QueueItem[] = [];
  /**
   * queue loading state
   *
   * @type {boolean}
   * @memberof QueueComponent
   */
  public loading: boolean;
  /**
   * Pagination data for soon fm queue
   *
   * @type {Pagination}
   * @memberof QueueComponent
   */
  public pagination: Pagination;
  /**
   * Returns true if all tracks have been loaded
   *
   * @readonly
   * @type {boolean}
   * @memberof QueueComponent
   */
  public get allTracksLoaded(): boolean {
    return this.pagination.currentPage >= this.pagination.totalPages;
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
    this.playerStore$.select(fromPlayerStore.getQueue)
      .subscribe(queue => this.queue = queue);
    this.playerStore$.select(fromPlayerStore.getQueueLoading)
      .subscribe(loading => this.loading = loading);
    this.playerStore$.select(fromPlayerStore.getQueuePagination)
      .subscribe(pagination => this.pagination = pagination);
  }
  /**
   * On scroll end load more tracks if needed
   *
   * @memberof QueueComponent
   */
  public onScrollEnd(): void {
    this.playerStore$.dispatch(new fromPlayerStore.LoadNextQueuePage());
    this.playerStore$.dispatch(new fromPlayerStore.LoadQueueMeta());
  }
}

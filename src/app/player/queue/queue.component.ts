import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { QueueItem } from '../../api';
import * as fromStore from '../../store';

@Component({
  selector: 'sfm-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
  /**
   * Observable of list of items in the queue
   *
   * @type {Observable<QueueItem[]>}
   * @memberof QueueComponent
   */
  public queue$: Observable<QueueItem[]>;
  /**
   * Creates an instance of QueueComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @memberof QueueComponent
   */
  constructor(private store: Store<fromStore.PlayerState>) { }
  /**
   * Subscribe to queue
   *
   * @memberof QueueComponent
   */
  public ngOnInit(): void {
    this.queue$ = this.store.select(fromStore.getQueue);
  }

}

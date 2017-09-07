import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { QueueItem, Mute, Volume, QueueMeta } from './api';
import * as fromStore from './store';

@Component({
  selector: 'fm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  current$: Observable<QueueItem>;
  queue$: Observable<QueueItem[]>;
  volume$: Observable<Volume>;
  mute$: Observable<Mute>;
  meta$: Observable<QueueMeta>;

  constructor(
    private store: Store<fromStore.PlayerState>,
  ) { }

  ngOnInit() {
    this.current$ = this.store.select(fromStore.getCurrent);
    this.queue$ = this.store.select(fromStore.getQueue);
    this.volume$ = this.store.select(fromStore.getVolume);
    this.mute$ = this.store.select(fromStore.getMute);
    this.meta$ = this.store.select(fromStore.getQueueMeta);

    this.store.dispatch({ type: fromStore.LOAD_CURRENT });
    this.store.dispatch({ type: fromStore.LOAD_QUEUE });
    this.store.dispatch({ type: fromStore.LOAD_VOLUME });
    this.store.dispatch({ type: fromStore.LOAD_MUTE });
    this.store.dispatch({ type: fromStore.LOAD_QUEUE_META });
  }
}

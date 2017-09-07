import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as queueActions from '../actions/queue.action';
import { PlayerQueueService } from '../../api';

@Injectable()
export class QueueEffects {

  @Effect()
  public loadQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_QUEUE)
    .map((action: queueActions.LoadQueue) => action.payload)
    .mergeMap((params) =>
      this.playerQueueSvc.query(params)
        .map((items) => new queueActions.LoadQueueSuccess(items))
        .catch((err) => Observable.of(new queueActions.LoadQueueFail(err)))
    );

  @Effect()
  public addToQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.ADD_QUEUE)
    .map((action: queueActions.AddQueue) => action.payload)
    .mergeMap((uri) =>
      this.playerQueueSvc.post(uri)
        .map((res) => new queueActions.AddQueueSuccess(res))
        .catch((err) => Observable.of(new queueActions.AddQueueFail(err)))
    );

  @Effect()
  public removeFromQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.REMOVE_QUEUE)
    .map((action: queueActions.RemoveQueue) => action.payload)
    .mergeMap((uuid) =>
      this.playerQueueSvc.delete(uuid)
        .map((res) => new queueActions.RemoveQueueSuccess(res))
        .catch((err) => Observable.of(new queueActions.RemoveQueueFail(err)))
    );

  @Effect()
  public loadQueueMeta$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_QUEUE_META)
    .switchMap(() =>
      this.playerQueueSvc.getMeta()
        .map((meta) => new queueActions.LoadQueueMetaSuccess(meta))
        .catch((err) => Observable.of(new queueActions.LoadQueueMetaFail(err)))
    );

  constructor(
    private actions$: Actions,
    private playerQueueSvc: PlayerQueueService
  ) { }
}

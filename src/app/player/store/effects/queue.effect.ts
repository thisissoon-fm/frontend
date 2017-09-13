import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as queueActions from '../actions/queue.action';
import { PlayerQueueService, Track, TrackService, User, UserService, QueueItem } from '../../../api';
import { PlayerEvent } from '../../../event';

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
    .ofType(queueActions.QUEUE_ADD)
    .map((action: queueActions.QueueAdd) => action.payload)
    .mergeMap((uri) =>
      this.playerQueueSvc.post(uri)
        .map((res) => new queueActions.QueueAddSuccess(res))
        .catch((err) => Observable.of(new queueActions.QueueAddFail(err)))
    );

  @Effect()
  public removeFromQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.QUEUE_REMOVE)
    .map((action: queueActions.QueueRemove) => action.payload)
    .mergeMap((uuid) =>
      this.playerQueueSvc.delete(uuid)
        .map((res) => new queueActions.QueueRemoveSuccess(uuid))
        .catch((err) => Observable.of(new queueActions.QueueRemoveFail(err)))
    );

  @Effect()
  public loadQueueMeta$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_QUEUE_META)
    .switchMap(() =>
      this.playerQueueSvc.getMeta()
        .map((meta) => new queueActions.LoadQueueMetaSuccess(meta))
        .catch((err) => Observable.of(new queueActions.LoadQueueMetaFail(err)))
    );

  @Effect()
  public loadQueueItem$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_QUEUE_ITEM)
    .map((action: queueActions.LoadQueueItem) => action.payload)
    .switchMap((data: PlayerEvent) => {
      const track = this.trackSvc.get(data.uri);
      const user = this.userSvc.get(data.user);
      return Observable.forkJoin(track, user)
        .map((results) =>
          new queueActions.LoadQueueItemSuccess({
            track: <Track>results[0],
            user: <User>results[1],
            uuid: null // TODO: update api to get uuid
          }))
        .catch((err) => Observable.of(new queueActions.LoadQueueItemFail(err)));
    });

  constructor(
    private actions$: Actions,
    private playerQueueSvc: PlayerQueueService,
    private trackSvc: TrackService,
    private userSvc: UserService
  ) { }
}

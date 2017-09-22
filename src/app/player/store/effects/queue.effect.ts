import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as queueActions from '../actions/queue.action';
import { PlayerQueueService, Track, TrackService, User, UserService, QueueItem, Pagination } from '../../../api';
import { PlayerEvent } from '../../../event';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';
import { PlayerState, getQueuePagination } from '../reducers';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class QueueEffects {

  @Effect()
  public loadQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_QUEUE)
    .mergeMap(() =>
      this.playerQueueSvc.query()
        .map((res) => new queueActions.LoadQueueSuccess(res))
        .catch((err) => Observable.of(new queueActions.LoadQueueFail(err)))
    );

  @Effect()
  public loadNextQueuePage$: Observable<Action> = this.actions$
    .ofType(queueActions.LOAD_NEXT_QUEUE_PAGE)
    .withLatestFrom(this.store$.select(getQueuePagination))
    .switchMap(((value: [Action, Pagination]) => {
      const params = new HttpParams()
        .set('page', `${value[1].currentPage + 1}`);
      return this.playerQueueSvc.query(params)
        .map((res) => new queueActions.LoadNextQueuePageSuccess(res))
        .catch((err) => Observable.of(new queueActions.LoadNextQueuePageFail(err)));
    }));

  @Effect()
  public addToQueue$: Observable<Action> = this.actions$
    .ofType(queueActions.QUEUE_ADD)
    .map((action: queueActions.QueueAdd) => action.payload)
    .mergeMap((uri) =>
      this.playerQueueSvc.post(uri)
        .map((res) => new queueActions.QueueAddSuccess(res))
        .catch((err) => Observable.of(new queueActions.QueueAddFail(err)))
    );

  @Effect({dispatch: false})
  public removeFromQueue$ = this.actions$
    .ofType(queueActions.QUEUE_REMOVE)
    .map((action: queueActions.QueueRemove) => action.payload)
    .switchMap((uuid) =>
      this.playerQueueSvc.delete(uuid)
        .catch((err) => Observable.of(err))
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
            track: results[0],
            user: results[1],
            uuid: null // TODO: update api to get uuid
          }))
        .catch((err) => Observable.of(new queueActions.LoadQueueItemFail(err)));
    });

  @Effect({dispatch: false})
  public loadQueueItemSuccess$ = this.actions$
    .ofType(queueActions.LOAD_QUEUE_ITEM_SUCCESS)
    .map((action: queueActions.LoadQueueItemSuccess) => action.payload)
    .do((item: QueueItem) =>
      this.notificationSvc.push(`${item.user.given_name} added a track on SOON FM_`, {
        body: `${item.track.name} by ${this.utilsSvc.getArtistsJoined(item.track.artists)}`,
        icon: item.user.avatar_url
      }));

  constructor(
    private actions$: Actions,
    private playerQueueSvc: PlayerQueueService,
    private trackSvc: TrackService,
    private userSvc: UserService,
    private notificationSvc: NotificationService,
    private utilsSvc: UtilsService,
    private store$: Store<PlayerState>
  ) { }
}

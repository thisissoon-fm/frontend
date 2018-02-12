import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { concatMap, withLatestFrom, map, tap } from 'rxjs/operators';

import * as queueActions from '../actions/queue.action';
import { QueueService, Track, TrackService, User, UserService, QueueItem, Pagination } from '../../../api';
import { PlayerEvent } from '../../../event';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';
import { PlayerState, getQueuePagination } from '../reducers';

@Injectable()
export class QueueEffects {

  @Effect()
  public loadQueue$: Observable<Action> = this.actions$
    .pipe(
      ofType(queueActions.LOAD_QUEUE),
      concatMap(() =>
        this.queueSvc.query()
          .map((res) => new queueActions.LoadQueueSuccess(res))
          .catch((err) => of(new queueActions.LoadQueueFail(err)))
      )
    );

  @Effect()
  public loadNextQueuePage$: Observable<Action> = this.actions$
    .pipe(
      ofType(queueActions.LOAD_NEXT_QUEUE_PAGE),
      withLatestFrom(this.store$.select(getQueuePagination)),
      concatMap((value: [Action, Pagination]) => {
        const params = new HttpParams()
          .set('page', `${value[1].currentPage + 1}`);
        return this.queueSvc.query(params)
          .map((res) => new queueActions.LoadNextQueuePageSuccess(res))
          .catch((err) => of(new queueActions.LoadNextQueuePageFail(err)));
      })
    );

  @Effect()
  public addToQueue$: Observable<Action> = this.actions$
    .pipe(
      ofType(queueActions.QUEUE_ADD),
      map((action: queueActions.QueueAdd) => action.payload),
      concatMap((uri) =>
        this.queueSvc.post(uri)
          .map((res) => new queueActions.QueueAddSuccess(res))
          .catch((err) => of(new queueActions.QueueAddFail(err)))
      )
    );

  @Effect({dispatch: false})
  public removeFromQueue$ = this.actions$
    .pipe(
      ofType(queueActions.QUEUE_REMOVE),
      map((action: queueActions.QueueRemove) => action.payload),
      concatMap((uuid) =>
        this.queueSvc.delete(uuid)
          .catch((err) => of(err))
      )
    );

  @Effect()
  public loadQueueMeta$: Observable<Action> = this.actions$
    .pipe(
      ofType(queueActions.LOAD_QUEUE_META),
      concatMap(() =>
        this.queueSvc.getMeta()
          .map((meta) => new queueActions.LoadQueueMetaSuccess(meta))
          .catch((err) => of(new queueActions.LoadQueueMetaFail(err)))
      )
    );

  @Effect()
  public loadQueueItem$: Observable<Action> = this.actions$
    .pipe(
      ofType(queueActions.LOAD_QUEUE_ITEM),
      map((action: queueActions.LoadQueueItem) => action.payload),
      concatMap((data: PlayerEvent) => {
        const track = this.trackSvc.get(data.uri);
        const user = this.userSvc.get(data.user);
        return combineLatest(track, user)
          .map((results) =>
            new queueActions.LoadQueueItemSuccess({
              track: results[0],
              user: results[1],
              uuid: data.id
            }))
            .catch((err) => of(new queueActions.LoadQueueItemFail(err)));
      })
    );

  @Effect({dispatch: false})
  public loadQueueItemSuccess$ = this.actions$
    .pipe(
      ofType(queueActions.LOAD_QUEUE_ITEM_SUCCESS),
      map((action: queueActions.LoadQueueItemSuccess) => action.payload),
      tap((item: QueueItem) =>
        this.notificationSvc.push(`${item.user.given_name} added a track on SOON FM_`, {
          body: `${item.track.name} by ${this.utilsSvc.getArtistsJoined(item.track.artists)}`,
          icon: item.user.avatar_url
        }))
      );

  constructor(
    private actions$: Actions,
    private queueSvc: QueueService,
    private trackSvc: TrackService,
    private userSvc: UserService,
    private notificationSvc: NotificationService,
    private utilsSvc: UtilsService,
    private store$: Store<PlayerState>
  ) { }
}

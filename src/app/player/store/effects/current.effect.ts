import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';

import * as currentActions from '../actions/current.action';
import { CurrentService, PauseService, QueueItem } from '../../../api';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';

@Injectable()
export class CurrentEffects {
  @Effect()
  public loadCurrent$: Observable<Action> = this.actions$.pipe(
    ofType(currentActions.LOAD_CURRENT),
    concatMap(params =>
      this.currentSvc.get().pipe(
        map(item => new currentActions.LoadCurrentSuccess(item)),
        catchError(err => of(new currentActions.LoadCurrentFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadCurrentSucess$ = this.actions$.pipe(
    ofType(currentActions.LOAD_CURRENT_SUCCESS),
    map((action: currentActions.LoadCurrentSuccess) => action.payload),
    tap((item: QueueItem) => {
      if (item) {
        const name = item.track.name;
        const artists = this.utilsSvc.getArtistsJoined(item.track.artists);
        this.title.setTitle(`${name} - ${artists} | SOON FM_`);
        this.notificationSvc.push(`Now playing on SOON FM_`, {
          body: `${name} by ${artists}`,
          icon: this.utilsSvc.getOptimalImage(item.track.album.images, 2)
        });
      }
    })
  );

  @Effect({ dispatch: false })
  public removeCurrentSuccess$ = this.actions$.pipe(
    ofType(currentActions.REMOVE_CURRENT_SUCCESS),
    tap(() => this.title.setTitle(`SOON FM_`))
  );

  @Effect({ dispatch: false })
  public removeCurrent$: Observable<Action> = this.actions$.pipe(
    ofType(currentActions.REMOVE_CURRENT),
    concatMap(() => this.currentSvc.delete().pipe(catchError(err => of(err))))
  );

  @Effect({ dispatch: false })
  public addPause$: Observable<Action> = this.actions$.pipe(
    ofType(currentActions.ADD_PAUSE),
    concatMap(() => this.pauseSvc.post().pipe(catchError(err => of(err))))
  );

  @Effect({ dispatch: false })
  public removePause$: Observable<Action> = this.actions$.pipe(
    ofType(currentActions.REMOVE_PAUSE),
    concatMap(() => this.pauseSvc.delete().pipe(catchError(err => of(err))))
  );

  constructor(
    private actions$: Actions,
    private currentSvc: CurrentService,
    private pauseSvc: PauseService,
    private notificationSvc: NotificationService,
    private utilsSvc: UtilsService,
    private title: Title
  ) {}
}

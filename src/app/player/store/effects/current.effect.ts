import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap, map, tap } from 'rxjs/operators';

import * as currentActions from '../actions/current.action';
import { CurrentService, PauseService, QueueItem } from '../../../api';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';

@Injectable()
export class CurrentEffects {

  @Effect()
  public loadCurrent$: Observable<Action> = this.actions$
    .pipe(
      ofType(currentActions.LOAD_CURRENT),
      concatMap((params) =>
        this.currentSvc.get()
          .map((item) => new currentActions.LoadCurrentSuccess(item))
          .catch((err) => of(new currentActions.LoadCurrentFail(err)))
      )
    );

  @Effect({dispatch: false})
  public loadCurrentSucess$ = this.actions$
    .pipe(
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

  @Effect({dispatch: false})
  public removeCurrentSuccess$ = this.actions$
    .pipe(
      ofType(currentActions.REMOVE_CURRENT_SUCCESS),
      tap(() => this.title.setTitle(`SOON FM_`))
    );


  @Effect({ dispatch: false })
  public removeCurrent$: Observable<Action> = this.actions$
    .pipe(
      ofType(currentActions.REMOVE_CURRENT),
      concatMap(() =>
        this.currentSvc.delete()
          .catch((err) => of(err))
      )
    );

  @Effect({ dispatch: false })
  public addPause$: Observable<Action> = this.actions$
    .pipe(
      ofType(currentActions.ADD_PAUSE),
      concatMap(() =>
        this.pauseSvc.post()
          .catch((err) => of(err))
      )
    );

  @Effect({ dispatch: false })
  public removePause$: Observable<Action> = this.actions$
    .pipe(
      ofType(currentActions.REMOVE_PAUSE),
      concatMap(() =>
        this.pauseSvc.delete()
          .catch((err) => of(err))
      )
    );


  constructor(
    private actions$: Actions,
    private currentSvc: CurrentService,
    private pauseSvc: PauseService,
    private notificationSvc: NotificationService,
    private utilsSvc: UtilsService,
    private title: Title,
  ) { }
}

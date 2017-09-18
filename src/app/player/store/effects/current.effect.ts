import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Title } from '@angular/platform-browser';

import * as currentActions from '../actions/current.action';
import { PlayerCurrentService, PlayerPauseService, QueueItem } from '../../../api';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';

@Injectable()
export class CurrentEffects {

  @Effect()
  public loadCurrent$: Observable<Action> = this.actions$
    .ofType(currentActions.LOAD_CURRENT)
    .switchMap((params) =>
      this.playerCurrentSvc.get()
        .map((item) => new currentActions.LoadCurrentSuccess(item))
        .catch((err) => Observable.of(new currentActions.LoadCurrentFail(err)))
    );

  @Effect({dispatch: false})
  public loadCurrentSucess$ = this.actions$
    .ofType(currentActions.LOAD_CURRENT_SUCCESS)
    .map((action: currentActions.LoadCurrentSuccess) => action.payload)
    .do((item: QueueItem) => {
      const name = item.track.name;
      const artists = this.utilsSvc.getArtistsJoined(item.track.artists);
      this.title.setTitle(`${name} - ${artists} | SOON FM_`);
      this.notificationSvc.push(`Now playing on SOON FM_`, {
        body: `${name} by ${artists}`,
        icon: this.utilsSvc.getOptimalImage(item.track.album.images, 2)
      });
    });

  @Effect({dispatch: false})
  public removeCurrentSuccess$ = this.actions$
    .ofType(currentActions.REMOVE_CURRENT_SUCCESS)
    .do(() => this.title.setTitle(`SOON FM_`));


  @Effect({ dispatch: false })
  public removeCurrent$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_CURRENT)
    .do(() =>
      this.playerCurrentSvc.delete()
        .catch((err) => Observable.of(err))
    );

  @Effect({ dispatch: false })
  public AddPause$: Observable<Action> = this.actions$
    .ofType(currentActions.ADD_PAUSE)
    .do(() =>
      this.playerPauseSvc.post()
        .catch((err) => Observable.of(err))
    );

  @Effect({ dispatch: false })
  public removePause$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_PAUSE)
    .do(() =>
      this.playerPauseSvc.delete()
        .catch((err) => Observable.of(err))
    );


  constructor(
    private actions$: Actions,
    private playerCurrentSvc: PlayerCurrentService,
    private playerPauseSvc: PlayerPauseService,
    private notificationSvc: NotificationService,
    private utilsSvc: UtilsService,
    private title: Title,
  ) { }
}

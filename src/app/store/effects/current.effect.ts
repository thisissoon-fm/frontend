import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as currentActions from '../actions/current.action';
import { PlayerCurrentService, PlayerPauseService } from '../../api';

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

  @Effect()
  public removeCurrent$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_CURRENT)
    .switchMap(() =>
      this.playerCurrentSvc.delete()
        .map((res) => new currentActions.RemoveCurrentSuccess(res))
        .catch((err) => Observable.of(new currentActions.RemoveCurrentFail(err)))
    );

  @Effect()
  public AddPause$: Observable<Action> = this.actions$
    .ofType(currentActions.ADD_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.post()
        .map((res) => new currentActions.AddPauseSuccess(res))
        .catch((err) => Observable.of(new currentActions.AddPauseFail(err)))
    );

  @Effect()
  public removePause$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.delete()
        .map((res) => new currentActions.RemovePauseSuccess(res))
        .catch((err) => Observable.of(new currentActions.RemovePauseFail(err)))
    );


  constructor(
    private actions$: Actions,
    private playerCurrentSvc: PlayerCurrentService,
    private playerPauseSvc: PlayerPauseService
  ) { }
}

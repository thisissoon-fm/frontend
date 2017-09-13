import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as currentActions from '../actions/current.action';
import { PlayerCurrentService, PlayerPauseService } from '../../../api';

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

  @Effect({ dispatch: false })
  public removeCurrent$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_CURRENT)
    .switchMap(() =>
      this.playerCurrentSvc.delete()
        .catch((err) => Observable.of(err))
    );

  @Effect({ dispatch: false })
  public AddPause$: Observable<Action> = this.actions$
    .ofType(currentActions.ADD_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.post()
        .catch((err) => Observable.of(err))
    );

  @Effect({ dispatch: false })
  public removePause$: Observable<Action> = this.actions$
    .ofType(currentActions.REMOVE_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.delete()
        .catch((err) => Observable.of(err))
    );


  constructor(
    private actions$: Actions,
    private playerCurrentSvc: PlayerCurrentService,
    private playerPauseSvc: PlayerPauseService
  ) { }
}

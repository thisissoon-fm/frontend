import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as pauseActions from '../actions/pause.action';
import { PlayerPauseService } from '../../api';

@Injectable()
export class PauseEffects {

  @Effect()
  public AddPause$: Observable<Action> = this.actions$
    .ofType(pauseActions.ADD_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.post()
        .map((res) => new pauseActions.AddPauseSuccess(res))
        .catch((err) => Observable.of(new pauseActions.AddPauseFail(err)))
    );

  @Effect()
  public removePause$: Observable<Action> = this.actions$
    .ofType(pauseActions.REMOVE_PAUSE)
    .mergeMap(() =>
      this.playerPauseSvc.delete()
        .map((res) => new pauseActions.RemovePauseSuccess(res))
        .catch((err) => Observable.of(new pauseActions.RemovePauseFail(err)))
    );


  constructor(
    private actions$: Actions,
    private playerPauseSvc: PlayerPauseService
  ) { }
}

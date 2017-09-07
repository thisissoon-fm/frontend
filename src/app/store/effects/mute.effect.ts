import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as muteActions from '../actions/mute.action';
import { PlayerMuteService } from '../../api';

@Injectable()
export class MuteEffects {

  @Effect()
  public loadMute$: Observable<Action> = this.actions$
    .ofType(muteActions.LOAD_MUTE)
    .switchMap(() =>
      this.playerMuteSvc.get()
        .map((mute) => new muteActions.LoadMuteSuccess(mute))
        .catch((err) => Observable.of(new muteActions.LoadMuteFail(err)))
    );

  @Effect()
  public AddMute$: Observable<Action> = this.actions$
    .ofType(muteActions.ADD_MUTE)
    .mergeMap(() =>
      this.playerMuteSvc.post()
        .map((res) => new muteActions.AddMuteSuccess(res))
        .catch((err) => Observable.of(new muteActions.AddMuteFail(err)))
    );

  @Effect()
  public removeMute$: Observable<Action> = this.actions$
    .ofType(muteActions.REMOVE_MUTE)
    .mergeMap(() =>
      this.playerMuteSvc.delete()
        .map((res) => new muteActions.RemoveMuteSuccess(res))
        .catch((err) => Observable.of(new muteActions.RemoveMuteFail(err)))
    );


  constructor(
    private actions$: Actions,
    private playerMuteSvc: PlayerMuteService
  ) { }
}

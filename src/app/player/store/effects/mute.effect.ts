import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as muteActions from '../actions/mute.action';
import { PlayerMuteService } from '../../../api';

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

  @Effect({ dispatch: false })
  public AddMute$: Observable<Action> = this.actions$
    .ofType(muteActions.ADD_MUTE)
    .mergeMap(() =>
      this.playerMuteSvc.post()
        .catch((err) => Observable.of(err))
    );

  @Effect({dispatch: false})
  public removeMute$: Observable<Action> = this.actions$
    .ofType(muteActions.REMOVE_MUTE)
    .mergeMap(() =>
      this.playerMuteSvc.delete()
        .catch((err) => Observable.of(err))
    );


  constructor(
    private actions$: Actions,
    private playerMuteSvc: PlayerMuteService
  ) { }
}

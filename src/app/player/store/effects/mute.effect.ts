import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as muteActions from '../actions/mute.action';
import { MuteService } from '../../../api';

@Injectable()
export class MuteEffects {

  @Effect()
  public loadMute$: Observable<Action> = this.actions$
    .ofType(muteActions.LOAD_MUTE)
    .switchMap(() =>
      this.muteSvc.get()
        .map((mute) => new muteActions.LoadMuteSuccess(mute))
        .catch((err) => Observable.of(new muteActions.LoadMuteFail(err)))
    );

  @Effect({ dispatch: false })
  public AddMute$ = this.actions$
    .ofType(muteActions.ADD_MUTE)
    .do(() =>
      this.muteSvc.post()
        .catch((err) => Observable.of(err))
    );

  @Effect({dispatch: false})
  public removeMute$ = this.actions$
    .ofType(muteActions.REMOVE_MUTE)
    .do(() =>
      this.muteSvc.delete()
        .catch((err) => Observable.of(err))
    );


  constructor(
    private actions$: Actions,
    private muteSvc: MuteService
  ) { }
}

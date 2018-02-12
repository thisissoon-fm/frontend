import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators';

import * as muteActions from '../actions/mute.action';
import { MuteService } from '../../../api';

@Injectable()
export class MuteEffects {

  @Effect()
  public loadMute$: Observable<Action> = this.actions$
    .pipe(
      ofType(muteActions.LOAD_MUTE),
      concatMap(() =>
        this.muteSvc.get()
          .map((mute) => new muteActions.LoadMuteSuccess(mute))
          .catch((err) => of(new muteActions.LoadMuteFail(err)))
      )
    );

  @Effect({ dispatch: false })
  public addMute$ = this.actions$
    .pipe(
      ofType(muteActions.ADD_MUTE),
      concatMap(() =>
        this.muteSvc.post()
          .catch((err) => of(err))
      )
    );

  @Effect({dispatch: false})
  public removeMute$ = this.actions$
    .pipe(
      ofType(muteActions.REMOVE_MUTE),
      concatMap(() =>
        this.muteSvc.delete()
          .catch((err) => of(err))
      )
    );

  constructor(
    private actions$: Actions,
    private muteSvc: MuteService
  ) { }
}

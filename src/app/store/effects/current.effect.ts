import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as currentActions from '../actions/current.action';
import { PlayerCurrentService } from '../../api';

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
    .map((action: currentActions.RemoveCurrent) => action.payload)
    .mergeMap((uuid) =>
      this.playerCurrentSvc.delete()
        .map((res) => new currentActions.RemoveCurrentSuccess(res))
        .catch((err) => Observable.of(new currentActions.RemoveCurrentFail(err)))
    );


  constructor(
    private actions$: Actions,
    private playerCurrentSvc: PlayerCurrentService
  ) { }
}

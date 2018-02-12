import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { concatMap, tap, map } from 'rxjs/operators';

import * as userActions from '../actions/user.action';
import { UserService } from '../../../api';

@Injectable()
export class UserEffects {

  @Effect()
  public loadCurrentUser$: Observable<Action> = this.actions$
    .pipe(
      ofType(userActions.LOAD_ME),
      concatMap(() =>
        this.userSvc.me()
          .map((res) => new userActions.LoadMeSuccess(res))
          .catch((err) => Observable.of(new userActions.LoadMeFail(err)))
      )
    );

  @Effect({dispatch: false})
  public loadCurrentUserFail$: Observable<Action> = this.actions$
    .pipe(
      ofType(userActions.LOAD_ME_FAIL),
      tap(() => this.userSvc.delete())
    );

  @Effect()
  public loadUser$: Observable<Action> = this.actions$
  .pipe(
    ofType(userActions.LOAD_USER),
    map((action: userActions.LoadUser) => action.payload),
    concatMap((id) =>
      this.userSvc.get(id)
        .map((res) => new userActions.LoadUserSuccess(res))
        .catch((err) => Observable.of(new userActions.LoadUserFail(err)))
      )
    );


  constructor(
    private actions$: Actions,
    private userSvc: UserService
  ) { }
}

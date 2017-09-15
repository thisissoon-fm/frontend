import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/user.action';
import { UserService } from '../../../api';

@Injectable()
export class UserEffects {

  @Effect()
  public LoadCurrentUser$: Observable<Action> = this.actions$
    .ofType(userActions.LOAD_ME)
    .switchMap(() =>
      this.userSvc.me()
        .map((res) => new userActions.LoadMeSuccess(res))
        .catch((err) => Observable.of(new userActions.LoadMeFail(err)))
    );

  @Effect()
  public LoadUser$: Observable<Action> = this.actions$
    .ofType(userActions.LOAD_USER)
    .map((action: userActions.LoadUser) => action.payload)
    .switchMap((id) =>
      this.userSvc.get(id)
        .map((res) => new userActions.LoadUserSuccess(res))
        .catch((err) => Observable.of(new userActions.LoadUserFail(err)))
    );


  constructor(
    private actions$: Actions,
    private userSvc: UserService
  ) { }
}

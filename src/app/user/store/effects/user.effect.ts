import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { catchError, concatMap, tap, map } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as userActions from '../actions/user.action';
import { UserService } from '../../../api';

@Injectable()
export class UserEffects {
  @Effect()
  public loadCurrentUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LOAD_ME),
    concatMap(() =>
      this.userSvc.me().pipe(
        map(res => new userActions.LoadMeSuccess(res)),
        catchError(err => observableOf(new userActions.LoadMeFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  public loadCurrentUserFail$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LOAD_ME_FAIL),
    tap(() => this.userSvc.delete())
  );

  @Effect()
  public loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(userActions.LOAD_USER),
    map((action: userActions.LoadUser) => action.payload),
    concatMap(id =>
      this.userSvc.get(id).pipe(
        map(res => new userActions.LoadUserSuccess(res)),
        catchError(err => observableOf(new userActions.LoadUserFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, private userSvc: UserService) {}
}

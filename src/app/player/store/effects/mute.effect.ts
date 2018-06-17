import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';

import * as muteActions from '../actions/mute.action';
import { MuteService } from '../../../api';

@Injectable()
export class MuteEffects {
  @Effect()
  public loadMute$: Observable<Action> = this.actions$.pipe(
    ofType(muteActions.LOAD_MUTE),
    concatMap(() =>
      this.muteSvc.get().pipe(
        map(mute => new muteActions.LoadMuteSuccess(mute)),
        catchError(err => of(new muteActions.LoadMuteFail(err)))
      )
    )
  );

  @Effect({ dispatch: false })
  public addMute$ = this.actions$.pipe(
    ofType(muteActions.ADD_MUTE),
    concatMap(() => this.muteSvc.post().pipe(catchError(err => of(err))))
  );

  @Effect({ dispatch: false })
  public removeMute$ = this.actions$.pipe(
    ofType(muteActions.REMOVE_MUTE),
    concatMap(() => this.muteSvc.delete().pipe(catchError(err => of(err))))
  );

  constructor(private actions$: Actions, private muteSvc: MuteService) {}
}

import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { of as observableOf, Observable } from 'rxjs';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as statsActions from '../actions/stats.action';
import { StatsService } from '../../../api';

@Injectable()
export class StatsEffects {
  @Effect()
  public loadStats$: Observable<Action> = this.actions$.pipe(
    ofType(statsActions.LOAD_STATS),
    concatMap(() => {
      const secondsInDay = 86400 * 1000;
      const now = new Date();
      const lastMonday = new Date(
        now.getTime() - secondsInDay * (now.getDay() - 1)
      );
      const nextFriday = new Date(
        now.getTime() + secondsInDay * (5 - now.getDay())
      );
      const params = new HttpParams()
        .set('from', lastMonday.toISOString().split('T')[0])
        .set('to', nextFriday.toISOString().split('T')[0]);
      return this.statsSvc.get(params).pipe(
        map(stats => new statsActions.LoadStatsSuccess(stats)),
        catchError(err => observableOf(new statsActions.LoadStatsFail(err)))
      );
    })
  );

  constructor(private actions$: Actions, private statsSvc: StatsService) {}
}

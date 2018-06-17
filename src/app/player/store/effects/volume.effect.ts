import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import * as volumeActions from '../actions/volume.action';
import { VolumeService } from '../../../api';

@Injectable()
export class VolumeEffects {
  @Effect()
  public loadVolume$: Observable<Action> = this.actions$.pipe(
    ofType(volumeActions.LOAD_VOLUME),
    concatMap(() =>
      this.volumeSvc.get().pipe(
        map(vol => new volumeActions.LoadVolumeSuccess(vol)),
        catchError(err => of(new volumeActions.LoadVolumeFail(err)))
      )
    )
  );

  @Effect()
  public setVolume$: Observable<Action> = this.actions$.pipe(
    ofType(volumeActions.SET_VOLUME),
    map((action: volumeActions.SetVolume) => action.payload),
    concatMap(vol =>
      this.volumeSvc.post(vol).pipe(
        map(res => new volumeActions.SetVolumeSuccess(res)),
        catchError(err => of(new volumeActions.SetVolumeFail(err)))
      )
    )
  );

  constructor(private actions$: Actions, private volumeSvc: VolumeService) {}
}

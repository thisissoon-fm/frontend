import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as volumeActions from '../actions/volume.action';
import { VolumeService } from '../../../api';

@Injectable()
export class VolumeEffects {

  @Effect()
  public loadVolume$: Observable<Action> = this.actions$
    .ofType(volumeActions.LOAD_VOLUME)
    .switchMap(() =>
      this.volumeSvc.get()
        .map((vol) => new volumeActions.LoadVolumeSuccess(vol))
        .catch((err) => Observable.of(new volumeActions.LoadVolumeFail(err)))
    );

  @Effect()
  public setVolume$: Observable<Action> = this.actions$
    .ofType(volumeActions.SET_VOLUME)
    .map((action: volumeActions.SetVolume) => action.payload)
    .mergeMap((vol) =>
      this.volumeSvc.post(vol)
        .map((res) => new volumeActions.SetVolumeSuccess(res))
        .catch((err) => Observable.of(new volumeActions.SetVolumeFail(err)))
    );


  constructor(
    private actions$: Actions,
    private volumeSvc: VolumeService
  ) { }
}

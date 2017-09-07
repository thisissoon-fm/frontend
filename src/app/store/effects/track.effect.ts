import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as trackActions from '../actions/track.action';
import { TrackService } from '../../api';

@Injectable()
export class TrackEffects {

  @Effect()
  public LoadTrack$: Observable<Action> = this.actions$
    .ofType(trackActions.LOAD_TRACK)
    .map((action: trackActions.LoadTrack) => action.payload)
    .mergeMap((uri) =>
      this.trackSvc.get(uri)
        .map((res) => new trackActions.LoadTrackSuccess(res))
        .catch((err) => Observable.of(new trackActions.LoadTrackFail(err)))
    );


  constructor(
    private actions$: Actions,
    private trackSvc: TrackService
  ) { }
}

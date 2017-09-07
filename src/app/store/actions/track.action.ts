import { Action } from '@ngrx/store';
import { Track } from '../../api';

export const LOAD_TRACK             = '[Track] Load Track';
export const LOAD_TRACK_FAIL        = '[Track] Load Track Fail';
export const LOAD_TRACK_SUCCESS     = '[Track] Load Track Success';


/**
 * Load Track Actions
 */
export class LoadTrack implements Action {
  readonly type = LOAD_TRACK;

  constructor(public payload: string) { }
}

export class LoadTrackSuccess implements Action {
  readonly type = LOAD_TRACK_SUCCESS;

  constructor(public payload: Track) { }
}

export class LoadTrackFail implements Action {
  readonly type = LOAD_TRACK_FAIL;

  constructor(public payload: any) { }
}

export type TrackAction =
  | LoadTrack
  | LoadTrackSuccess
  | LoadTrackFail;

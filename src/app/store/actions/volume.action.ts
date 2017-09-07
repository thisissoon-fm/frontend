import { Action } from '@ngrx/store';
import { Volume } from '../../api';

export const SET_VOLUME              = '[Volume] Set Volume';
export const SET_VOLUME_SUCCESS      = '[Volume] Set Volume Success';
export const SET_VOLUME_FAIL         = '[Volume] Set Volume Fail';
export const LOAD_VOLUME             = '[Volume] Load Volume';
export const LOAD_VOLUME_FAIL        = '[Volume] Load Volume Fail';
export const LOAD_VOLUME_SUCCESS     = '[Volume] Load Volume Success';


/**
 * Set Volume Actions
 */
export class SetVolume implements Action {
  readonly type = SET_VOLUME;

  constructor(public payload: Volume) { }
}

export class SetVolumeSuccess implements Action {
  readonly type = SET_VOLUME_SUCCESS;

  constructor(public payload: Volume) { }
}

export class SetVolumeFail implements Action {
  readonly type = SET_VOLUME_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Volume Actions
 */
export class LoadVolume implements Action {
  readonly type = LOAD_VOLUME;
}

export class LoadVolumeSuccess implements Action {
  readonly type = LOAD_VOLUME_SUCCESS;

  constructor(public payload: Volume) { }
}

export class LoadVolumeFail implements Action {
  readonly type = LOAD_VOLUME_FAIL;

  constructor(public payload: any) { }
}

export type VolumeAction =
  | SetVolume
  | SetVolumeSuccess
  | SetVolumeFail
  | LoadVolume
  | LoadVolumeSuccess
  | LoadVolumeFail;

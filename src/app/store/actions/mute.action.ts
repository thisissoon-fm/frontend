import { Action } from '@ngrx/store';
import { Mute } from '../../api';

export const ADD_MUTE              = '[Mute] Add Mute';
export const ADD_MUTE_SUCCESS      = '[Mute] Add Mute Success';
export const ADD_MUTE_FAIL         = '[Mute] Add Mute Fail';
export const REMOVE_MUTE           = '[Mute] Remove Mute';
export const REMOVE_MUTE_SUCCESS   = '[Mute] Remove Mute Success';
export const REMOVE_MUTE_FAIL      = '[Mute] Remove Mute Fail';
export const LOAD_MUTE             = '[Mute] Load Mute';
export const LOAD_MUTE_FAIL        = '[Mute] Load Mute Fail';
export const LOAD_MUTE_SUCCESS     = '[Mute] Load Mute Success';


/**
 * Add to Mute to Mute Actions
 */
export class AddMute implements Action {
  readonly type = ADD_MUTE;
}

export class AddMuteSuccess implements Action {
  readonly type = ADD_MUTE_SUCCESS;

  constructor(public payload: Mute) { }
}

export class AddMuteFail implements Action {
  readonly type = ADD_MUTE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove from Mute from Mute Actions
 */
export class RemoveMute implements Action {
  readonly type = REMOVE_MUTE;
}

export class RemoveMuteSuccess implements Action {
  readonly type = REMOVE_MUTE_SUCCESS;

  constructor(public payload: Mute) { }
}

export class RemoveMuteFail implements Action {
  readonly type = REMOVE_MUTE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Mute Actions
 */
export class LoadMute implements Action {
  readonly type = LOAD_MUTE;
}

export class LoadMuteSuccess implements Action {
  readonly type = LOAD_MUTE_SUCCESS;

  constructor(public payload: Mute) { }
}

export class LoadMuteFail implements Action {
  readonly type = LOAD_MUTE_FAIL;

  constructor(public payload: any) { }
}

export type MuteAction =
  | AddMute
  | AddMuteSuccess
  | AddMuteFail
  | RemoveMute
  | RemoveMuteSuccess
  | RemoveMuteFail
  | LoadMute
  | LoadMuteSuccess
  | LoadMuteFail;

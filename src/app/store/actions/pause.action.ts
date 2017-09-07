import { Action } from '@ngrx/store';

export const ADD_PAUSE              = '[Pause] Add Pause';
export const ADD_PAUSE_SUCCESS      = '[Pause] Add Pause Success';
export const ADD_PAUSE_FAIL         = '[Pause] Add Pause Fail';
export const REMOVE_PAUSE           = '[Pause] Remove Pause';
export const REMOVE_PAUSE_SUCCESS   = '[Pause] Remove Pause Success';
export const REMOVE_PAUSE_FAIL      = '[Pause] Remove Pause Fail';


/**
 * Add to Pause to Pause Actions
 */
export class AddPause implements Action {
  readonly type = ADD_PAUSE;
}

export class AddPauseSuccess implements Action {
  readonly type = ADD_PAUSE_SUCCESS;

  constructor(public payload: boolean) { }
}

export class AddPauseFail implements Action {
  readonly type = ADD_PAUSE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove from Pause from Pause Actions
 */
export class RemovePause implements Action {
  readonly type = REMOVE_PAUSE;
}

export class RemovePauseSuccess implements Action {
  readonly type = REMOVE_PAUSE_SUCCESS;

  constructor(public payload: boolean) { }
}

export class RemovePauseFail implements Action {
  readonly type = REMOVE_PAUSE_FAIL;

  constructor(public payload: any) { }
}

export type PauseAction =
  | AddPause
  | AddPauseSuccess
  | AddPauseFail
  | RemovePause
  | RemovePauseSuccess
  | RemovePauseFail;

import { Action } from '@ngrx/store';
import { QueueItem } from '../../api';

export const REMOVE_CURRENT           = '[Current] Remove Current';
export const REMOVE_CURRENT_SUCCESS   = '[Current] Remove Current Success';
export const REMOVE_CURRENT_FAIL      = '[Current] Remove Current Fail';
export const LOAD_CURRENT             = '[Current] Load Current';
export const LOAD_CURRENT_FAIL        = '[Current] Load Current Fail';
export const LOAD_CURRENT_SUCCESS     = '[Current] Load Current Success';
export const ADD_PAUSE                = '[Current] Add Pause';
export const ADD_PAUSE_SUCCESS        = '[Current] Add Pause Success';
export const ADD_PAUSE_FAIL           = '[Current] Add Pause Fail';
export const REMOVE_PAUSE             = '[Current] Remove Pause';
export const REMOVE_PAUSE_SUCCESS     = '[Current] Remove Pause Success';
export const REMOVE_PAUSE_FAIL        = '[Current] Remove Pause Fail';

/**
 * Remove Track from Collection Actions
 */
export class RemoveCurrent implements Action {
  readonly type = REMOVE_CURRENT;
}

export class RemoveCurrentSuccess implements Action {
  readonly type = REMOVE_CURRENT_SUCCESS;

  constructor(public payload: any) { }
}

export class RemoveCurrentFail implements Action {
  readonly type = REMOVE_CURRENT_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Collection Actions
 */
export class LoadCurrent implements Action {
  readonly type = LOAD_CURRENT;
}

export class LoadCurrentSuccess implements Action {
  readonly type = LOAD_CURRENT_SUCCESS;

  constructor(public payload: QueueItem) { }
}

export class LoadCurrentFail implements Action {
  readonly type = LOAD_CURRENT_FAIL;

  constructor(public payload: any) { }
}


/**
 * Add Pause Actions
 */
export class AddPause implements Action {
  readonly type = ADD_PAUSE;
}

export class AddPauseSuccess implements Action {
  readonly type = ADD_PAUSE_SUCCESS;

  constructor(public payload: any) { }
}

export class AddPauseFail implements Action {
  readonly type = ADD_PAUSE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove Pause Actions
 */
export class RemovePause implements Action {
  readonly type = REMOVE_PAUSE;
}

export class RemovePauseSuccess implements Action {
  readonly type = REMOVE_PAUSE_SUCCESS;

  constructor(public payload: any) { }
}

export class RemovePauseFail implements Action {
  readonly type = REMOVE_PAUSE_FAIL;

  constructor(public payload: any) { }
}

export type CurrentAction =
  | RemoveCurrent
  | RemoveCurrentSuccess
  | RemoveCurrentFail
  | LoadCurrent
  | LoadCurrentSuccess
  | LoadCurrentFail
  | AddPause
  | AddPauseSuccess
  | AddPauseFail
  | RemovePause
  | RemovePauseSuccess
  | RemovePauseFail;

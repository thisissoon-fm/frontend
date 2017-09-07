import { Action } from '@ngrx/store';
import { QueueItem } from '../../api';

export const REMOVE_CURRENT           = '[Current] Remove Current';
export const REMOVE_CURRENT_SUCCESS   = '[Current] Remove Current Success';
export const REMOVE_CURRENT_FAIL      = '[Current] Remove Current Fail';
export const LOAD_CURRENT             = '[Current] Load Current';
export const LOAD_CURRENT_FAIL        = '[Current] Load Current Fail';
export const LOAD_CURRENT_SUCCESS     = '[Current] Load Current Success';

/**
 * Remove Track from Collection Actions
 */
export class RemoveCurrent implements Action {
  readonly type = REMOVE_CURRENT;

  constructor(public payload: string) { }
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

export type CurrentAction =
  | RemoveCurrent
  | RemoveCurrentSuccess
  | RemoveCurrentFail
  | LoadCurrent
  | LoadCurrentSuccess
  | LoadCurrentFail;

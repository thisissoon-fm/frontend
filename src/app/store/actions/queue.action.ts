import { HttpParams } from "@angular/common/http";
import { Action } from '@ngrx/store';
import { QueueItem, QueueMeta } from '../../api';

export const ADD_QUEUE                 = '[Queue] Add Queue';
export const ADD_QUEUE_SUCCESS         = '[Queue] Add Queue Success';
export const ADD_QUEUE_FAIL            = '[Queue] Add Queue Fail';
export const REMOVE_QUEUE              = '[Queue] Remove Queue';
export const REMOVE_QUEUE_SUCCESS      = '[Queue] Remove Queue Success';
export const REMOVE_QUEUE_FAIL         = '[Queue] Remove Queue Fail';
export const LOAD_QUEUE                = '[Queue] Load Queue';
export const LOAD_QUEUE_FAIL           = '[Queue] Load Queue Fail';
export const LOAD_QUEUE_SUCCESS        = '[Queue] Load Queue Success';
export const LOAD_QUEUE_META           = '[Queue] Load Queue Meta';
export const LOAD_QUEUE_META_FAIL      = '[Queue] Load Queue Meta Fail';
export const LOAD_QUEUE_META_SUCCESS   = '[Queue] Load Queue Meta Success';


/**
 * Add track to Queue Actions
 */
export class AddQueue implements Action {
  readonly type = ADD_QUEUE;

  constructor(public payload: string) { }
}

export class AddQueueSuccess implements Action {
  readonly type = ADD_QUEUE_SUCCESS;

  constructor(public payload: any) { }
}

export class AddQueueFail implements Action {
  readonly type = ADD_QUEUE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove from Queue Actions
 */
export class RemoveQueue implements Action {
  readonly type = REMOVE_QUEUE;

  constructor(public payload: string) { }
}

export class RemoveQueueSuccess implements Action {
  readonly type = REMOVE_QUEUE_SUCCESS;

  constructor(public payload: any) { }
}

export class RemoveQueueFail implements Action {
  readonly type = REMOVE_QUEUE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Queue Actions
 */
export class LoadQueue implements Action {
  readonly type = LOAD_QUEUE;

  constructor(public payload?: HttpParams) { }
}

export class LoadQueueSuccess implements Action {
  readonly type = LOAD_QUEUE_SUCCESS;

  constructor(public payload: QueueItem[]) { }
}

export class LoadQueueFail implements Action {
  readonly type = LOAD_QUEUE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Queue Meta Actions
 */
export class LoadQueueMeta implements Action {
  readonly type = LOAD_QUEUE_META;
}

export class LoadQueueMetaSuccess implements Action {
  readonly type = LOAD_QUEUE_META_SUCCESS;

  constructor(public payload: QueueMeta) { }
}

export class LoadQueueMetaFail implements Action {
  readonly type = LOAD_QUEUE_META_FAIL;

  constructor(public payload: any) { }
}

export type QueueAction =
  | AddQueue
  | AddQueueSuccess
  | AddQueueFail
  | RemoveQueue
  | RemoveQueueSuccess
  | RemoveQueueFail
  | LoadQueue
  | LoadQueueSuccess
  | LoadQueueFail
  | LoadQueueMeta
  | LoadQueueMetaSuccess
  | LoadQueueMetaFail;

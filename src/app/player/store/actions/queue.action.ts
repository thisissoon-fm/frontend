import { HttpParams } from '@angular/common/http';
import { Action } from '@ngrx/store';

import { QueueItem, QueueMeta, QueueResponse } from '../../../api';
import { PlayerEvent } from '../../../event';

export const QUEUE_ADD                           = '[Queue] Queue Add';
export const QUEUE_ADD_SUCCESS                   = '[Queue] Queue Add Success';
export const QUEUE_ADD_FAIL                      = '[Queue] Queue Add Fail';
export const QUEUE_REMOVE                        = '[Queue] Queue Remove';
export const QUEUE_REMOVE_SUCCESS                = '[Queue] Queue Remove Success';
export const QUEUE_REMOVE_FAIL                   = '[Queue] Queue Remove Fail';
export const QUEUE_SHIFT                         = '[Queue] Queue Shift';
export const QUEUE_POP                           = '[Queue] Queue Pop';
export const LOAD_QUEUE                          = '[Queue] Load Queue';
export const LOAD_QUEUE_FAIL                     = '[Queue] Load Queue Fail';
export const LOAD_QUEUE_SUCCESS                  = '[Queue] Load Queue Success';
export const LOAD_NEXT_QUEUE_PAGE                = '[Queue] Load Next Queue Page';
export const LOAD_NEXT_QUEUE_PAGE_FAIL           = '[Queue] Load Next Queue Page Fail';
export const LOAD_NEXT_QUEUE_PAGE_SUCCESS        = '[Queue] Load Next Queue Page Success';
export const LOAD_QUEUE_META                     = '[Queue] Load Queue Meta';
export const LOAD_QUEUE_META_FAIL                = '[Queue] Load Queue Meta Fail';
export const LOAD_QUEUE_META_SUCCESS             = '[Queue] Load Queue Meta Success';
export const LOAD_QUEUE_ITEM                     = '[Queue] Load Queue Item';
export const LOAD_QUEUE_ITEM_FAIL                = '[Queue] Load Queue Item Fail';
export const LOAD_QUEUE_ITEM_SUCCESS             = '[Queue] Load Queue Item Success';


/**
 * Add track to Queue Actions
 */
export class QueueAdd implements Action {
  readonly type = QUEUE_ADD;

  constructor(public payload: string) { }
}

export class QueueAddSuccess implements Action {
  readonly type = QUEUE_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class QueueAddFail implements Action {
  readonly type = QUEUE_ADD_FAIL;

  constructor(public payload: any) { }
}

/**
 * Remove from Queue Actions
 */
export class QueueRemove implements Action {
  readonly type = QUEUE_REMOVE;

  constructor(public payload: string) { }
}

export class QueueRemoveSuccess implements Action {
  readonly type = QUEUE_REMOVE_SUCCESS;

  constructor(public payload: string) { }
}

export class QueueRemoveFail implements Action {
  readonly type = QUEUE_REMOVE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Queue Actions
 */
export class LoadQueue implements Action {
  readonly type = LOAD_QUEUE;
}

export class LoadQueueSuccess implements Action {
  readonly type = LOAD_QUEUE_SUCCESS;

  constructor(public payload: QueueResponse) { }
}

export class LoadQueueFail implements Action {
  readonly type = LOAD_QUEUE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load Next Queue page Actions
 */
export class LoadNextQueuePage implements Action {
  readonly type = LOAD_NEXT_QUEUE_PAGE;
}

export class LoadNextQueuePageSuccess implements Action {
  readonly type = LOAD_NEXT_QUEUE_PAGE_SUCCESS;

  constructor(public payload: QueueResponse) { }
}

export class LoadNextQueuePageFail implements Action {
  readonly type = LOAD_NEXT_QUEUE_PAGE_FAIL;

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

/**
 * Load Queue Item Actions
 */
export class LoadQueueItem implements Action {
  readonly type = LOAD_QUEUE_ITEM;

  constructor(public payload: PlayerEvent) { }
}

export class LoadQueueItemSuccess implements Action {
  readonly type = LOAD_QUEUE_ITEM_SUCCESS;

  constructor(public payload: QueueItem) { }
}

export class LoadQueueItemFail implements Action {
  readonly type = LOAD_QUEUE_ITEM_FAIL;

  constructor(public payload: any) { }
}

/**
 * Queue Pop/Shift Actions
 */
export class QueueShift implements Action {
  readonly type = QUEUE_SHIFT;
}


export type QueueAction =
  | QueueAdd
  | QueueAddSuccess
  | QueueAddFail
  | QueueRemove
  | QueueRemoveSuccess
  | QueueRemoveFail
  | LoadQueue
  | LoadQueueSuccess
  | LoadQueueFail
  | LoadNextQueuePage
  | LoadNextQueuePageSuccess
  | LoadNextQueuePageFail
  | LoadQueueMeta
  | LoadQueueMetaSuccess
  | LoadQueueMetaFail
  | LoadQueueItem
  | LoadQueueItemSuccess
  | LoadQueueItemFail
  | QueueShift;

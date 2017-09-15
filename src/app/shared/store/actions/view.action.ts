import { Action } from '@ngrx/store';
import { CenterView } from '../../../shared';

export const SET_CENTER_VIEW             = '[View] Set Center View';
export const SET_ROUTER_SEARCH_ACTIVE    = '[View] Set Router Search Active';
export const SET_SEARCH_PAGE_ACTIVE      = '[View] Set Search Page Active';

/**
 * Set view actions
 */
export class SetCenterView implements Action {
  readonly type = SET_CENTER_VIEW;

  constructor(public payload: CenterView) { }
}

export class SetRouterSearchActive implements Action {
  readonly type = SET_ROUTER_SEARCH_ACTIVE;

  constructor(public payload: boolean) { }
}

export class SetSearchPageActive implements Action {
  readonly type = SET_SEARCH_PAGE_ACTIVE;

  constructor(public payload: boolean) { }
}


export type ViewAction =
  | SetCenterView
  | SetRouterSearchActive
  | SetSearchPageActive;

import { Action } from '@ngrx/store';

export const SET_ROUTER_SEARCH_ACTIVE    = '[View] Set Router Search Active';
export const SET_SEARCH_PAGE_ACTIVE      = '[View] Set Search Page Active';

/**
 * Set view actions
 */
export class SetRouterSearchActive implements Action {
  readonly type = SET_ROUTER_SEARCH_ACTIVE;

  constructor(public payload: boolean) { }
}

export class SetSearchPageActive implements Action {
  readonly type = SET_SEARCH_PAGE_ACTIVE;

  constructor(public payload: boolean) { }
}


export type ViewAction =
  | SetRouterSearchActive
  | SetSearchPageActive;

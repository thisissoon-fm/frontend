import { Action } from '@ngrx/store';
import { SearchType } from '../../api';

export const LOAD_SEARCH_RESULTS             = '[Search] Load Search';
export const LOAD_SEARCH_RESULTS_FAIL        = '[Search] Load Search Fail';
export const LOAD_SEARCH_RESULTS_SUCCESS     = '[Search] Load Search Success';

/**
 * Load Current Actions
 */
export class LoadSearchResults implements Action {
  readonly type = LOAD_SEARCH_RESULTS;

  constructor(public payload: { query: string, type: SearchType }) { }
}

export class LoadSearchResultsSuccess implements Action {
  readonly type = LOAD_SEARCH_RESULTS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadSearchResultsFail implements Action {
  readonly type = LOAD_SEARCH_RESULTS_FAIL;

  constructor(public payload: any) { }
}


export type SearchAction =
  | LoadSearchResults
  | LoadSearchResultsSuccess
  | LoadSearchResultsFail;

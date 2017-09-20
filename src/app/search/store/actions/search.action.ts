import { Action } from '@ngrx/store';
import { SearchType, SpotifyArtist, SpotifySearch, SpotifyAlbums } from '../../../api';

export const LOAD_SEARCH_RESULTS                       = '[Search] Load Search';
export const LOAD_SEARCH_RESULTS_FAIL                  = '[Search] Load Search Fail';
export const LOAD_SEARCH_RESULTS_SUCCESS               = '[Search] Load Search Success';
export const LOAD_SEARCH_RESULTS_NEXT_PAGE             = '[Search] Load Search Next Page';
export const LOAD_SEARCH_RESULTS_NEXT_PAGE_FAIL        = '[Search] Load Search Next Page Fail';
export const LOAD_SEARCH_RESULTS_NEXT_PAGE_SUCCESS     = '[Search] Load Search Next Page Success';
export const SET_SEARCH_QUERY                          = '[Search] Set Search Query';
export const SET_SEARCH_TYPE                           = '[Search] Set Search Type';
export const CLEAR_SEARCH                              = '[Search] Clear Search';

/**
 * Load search results actions
 */
export class LoadSearchResults implements Action {
  readonly type = LOAD_SEARCH_RESULTS;
}

export class LoadSearchResultsSuccess implements Action {
  readonly type = LOAD_SEARCH_RESULTS_SUCCESS;

  constructor(public payload: SpotifySearch) { }
}

export class LoadSearchResultsFail implements Action {
  readonly type = LOAD_SEARCH_RESULTS_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load search results next page actions
 */
export class LoadSearchResultsNextPage implements Action {
  readonly type = LOAD_SEARCH_RESULTS_NEXT_PAGE;
}

export class LoadSearchResultsNextPageSuccess implements Action {
  readonly type = LOAD_SEARCH_RESULTS_NEXT_PAGE_SUCCESS;

  constructor(public payload: SpotifySearch) { }
}

export class LoadSearchResultsNextPageFail implements Action {
  readonly type = LOAD_SEARCH_RESULTS_NEXT_PAGE_FAIL;

  constructor(public payload: any) { }
}

/**
 * Set search value actions
 */
export class SetSearchQuery implements Action {
  readonly type = SET_SEARCH_QUERY;

  constructor(public payload: string) { }
}

export class SetSearchType implements Action {
  readonly type = SET_SEARCH_TYPE;

  constructor(public payload: SearchType) { }
}


/**
 * Clear search
 */
export class ClearSearch implements Action {
  readonly type = CLEAR_SEARCH;
}

export type SearchAction =
  | LoadSearchResults
  | LoadSearchResultsSuccess
  | LoadSearchResultsFail
  | LoadSearchResultsNextPage
  | LoadSearchResultsNextPageSuccess
  | LoadSearchResultsNextPageFail
  | SetSearchType
  | SetSearchQuery
  | ClearSearch;

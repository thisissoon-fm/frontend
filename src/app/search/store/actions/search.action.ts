import { Action } from '@ngrx/store';
import { SearchType, SpotifyArtist, SpotifySearch, SpotifyAlbums } from '../../../api';
import { LoadArtistResult } from '../reducers';

export const LOAD_SEARCH_RESULTS             = '[Search] Load Search';
export const LOAD_SEARCH_RESULTS_FAIL        = '[Search] Load Search Fail';
export const LOAD_SEARCH_RESULTS_SUCCESS     = '[Search] Load Search Success';
export const SET_SEARCH_QUERY                = '[Search] Set Search Query';
export const SET_SEARCH_TYPE                 = '[Search] Set Search Type';

/**
 * Load search results actions
 */
export class LoadSearchResults implements Action {
  readonly type = LOAD_SEARCH_RESULTS;
}

export class LoadSearchResultsSuccess implements Action {
  readonly type = LOAD_SEARCH_RESULTS_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadSearchResultsFail implements Action {
  readonly type = LOAD_SEARCH_RESULTS_FAIL;

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

export type SearchAction =
  | LoadSearchResults
  | LoadSearchResultsSuccess
  | LoadSearchResultsFail
  | SetSearchType
  | SetSearchQuery;

import * as fromSearch from '../actions/search.action';
import { SearchType } from '../../api';

export interface SearchState {
  loaded: boolean;
  loading: boolean;
  results: any[];
  type: SearchType;
  query: string;
}

const initialState: SearchState = {
  loaded: false,
  loading: false,
  results: [],
  type: 'track',
  query: null
};

export function searchReducer(
  state = initialState,
  action: fromSearch.SearchAction
): SearchState {
  switch (action.type) {
    case fromSearch.LOAD_SEARCH_RESULTS: {
      const data = (<fromSearch.LoadSearchResults>action).payload;

      return Object.assign({}, state, {
        loaded: false,
        loading: true,
        query: data.query,
        type: data.type,
      });
    }
    case fromSearch.LOAD_SEARCH_RESULTS_SUCCESS: {
      const results = (<fromSearch.LoadSearchResultsSuccess>action).payload;

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        results
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_FAIL: {
      return Object.assign({}, initialState);
    }
  }

  return state;
}

export const getSearchResultsLoaded = (state: SearchState) => state.loaded;
export const getSearchResultsLoading = (state: SearchState) => state.loading;
export const getSearchResults = (state: SearchState) => state.results;
export const getSearchQuery = (state: SearchState) => state.query;
export const getSearchType = (state: SearchState) => state.type;

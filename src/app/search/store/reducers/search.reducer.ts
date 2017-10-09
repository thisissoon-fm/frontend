import * as fromSearch from '../actions/search.action';
import { SearchType, SpotifyArtist, SpotifySearch, SpotifyAlbums, Pagination } from '../../../api';

export interface SearchState {
  loaded: boolean;
  loading: boolean;
  results: any[];
  pagination: Pagination;
  type: SearchType;
  query: string;
}

const initialState: SearchState = {
  loaded: false,
  loading: false,
  results: [],
  type: 'track',
  pagination: { totalCount: 0, totalPages: 1, currentPage: 1 },
  query: null
};

export function searchReducer(
  state = initialState,
  action: fromSearch.SearchAction
): SearchState {
  switch (action.type) {
    case fromSearch.LOAD_SEARCH_RESULTS: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true,
        results: [],
        pagination: { totalCount: 0, totalPages: 1, currentPage: 1 }
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_SUCCESS: {
      const res = (<fromSearch.LoadSearchResultsSuccess>action).payload[`${state.type}s`];
      const items = res && res.items ? res.items : [];
      const pagination: Pagination = {
        currentPage: 1,
        totalCount: res.total,
        totalPages: Math.ceil(res.total / res.limit)
      };

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        results: items,
        pagination
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_FAIL: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        results: [],
        pagination: Object.assign({}, initialState.pagination)
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_NEXT_PAGE: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_NEXT_PAGE_SUCCESS: {
      const res = (<fromSearch.LoadSearchResultsNextPageSuccess>action).payload[`${state.type}s`];
      const items = [...state.results, ...res.items];
      const pagination: Pagination = {
        currentPage: state.pagination.currentPage + 1,
        totalCount: res.total,
        totalPages: Math.ceil(res.total / res.limit)
      };

      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        results: items,
        pagination
      });
    }

    case fromSearch.LOAD_SEARCH_RESULTS_NEXT_PAGE_FAIL: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false
      });
    }

    case fromSearch.SET_SEARCH_TYPE: {
      const type = (<fromSearch.SetSearchType>action).payload;

      return Object.assign({}, state, { type });
    }

    case fromSearch.SET_SEARCH_QUERY: {
      const query = (<fromSearch.SetSearchQuery>action).payload;

      return Object.assign({}, state, { query });
    }

    case fromSearch.CLEAR_SEARCH: {
      console.log('clear search');
      return Object.assign({}, initialState);
    }
  }

  return state;
}

export const getSearchResultsLoaded = (state: SearchState) => state.loaded;
export const getSearchResultsLoading = (state: SearchState) => state.loading;
export const getResults = (state: SearchState) => state.results;
export const getSearchQuery = (state: SearchState) => state.query;
export const getSearchType = (state: SearchState) => state.type;

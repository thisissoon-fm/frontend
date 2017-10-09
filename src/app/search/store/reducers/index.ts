import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchState, searchReducer, getResults} from './search.reducer';

export const reducers = searchReducer;
export const getSearchState = createFeatureSelector<SearchState>('search');

export const getSearchResults = createSelector(
  getSearchState,
  getResults
);

export { SearchState } from './search.reducer';

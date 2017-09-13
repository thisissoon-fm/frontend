import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchState, searchReducer } from './search.reducer';

export const reducers = searchReducer;
export const getSearchState = createFeatureSelector<SearchState>('search');

export * from './search.reducer';

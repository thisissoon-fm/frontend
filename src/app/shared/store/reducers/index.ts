import { createFeatureSelector, createSelector } from '@ngrx/store';
import { viewReducer, ViewState, getSearchPageActiveFromState, getRouterSearchActiveFromState } from './view.reducer';

export interface SharedState {
  view: ViewState;
}

export const reducers = {
  view: viewReducer,
};

export const getSharedState = createFeatureSelector<SharedState>('shared');

export const getViewState = createSelector(
  getSharedState,
  (state: SharedState) => state.view
);

export const getSearchPageActive = createSelector(
  getViewState,
  getSearchPageActiveFromState
);

export const getRouterSearchActive = createSelector(
  getViewState,
  getRouterSearchActiveFromState
);

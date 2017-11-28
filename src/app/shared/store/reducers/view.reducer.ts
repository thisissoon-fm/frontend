import * as fromViewActions from '../actions/view.action';

export interface ViewState {
  routerSearchActive: boolean;
  searchPageActive: boolean;
  searchDetailPageActive: boolean;
}

const initialState: ViewState = {
  routerSearchActive: false,
  searchPageActive: false,
  searchDetailPageActive: false
};

export function viewReducer(
  state = initialState,
  action: fromViewActions.ViewAction
): ViewState {
  switch (action.type) {
    case fromViewActions.SET_ROUTER_SEARCH_ACTIVE: {
      const routerSearchActive = (<fromViewActions.SetRouterSearchActive>action).payload;
      return Object.assign({}, state, { routerSearchActive });
    }

    case fromViewActions.SET_SEARCH_PAGE_ACTIVE: {
      const searchPageActive = (<fromViewActions.SetSearchPageActive>action).payload;
      return Object.assign({}, state, { searchPageActive });
    }

    case fromViewActions.SET_SEARCH_DETAIL_PAGE_ACTIVE: {
      const searchDetailPageActive = (<fromViewActions.SetSearchDetailPageActive>action).payload;
      return Object.assign({}, state, { searchDetailPageActive });
    }
  }

  return state;
}

export const getSearchPageActiveFromState = (state: ViewState) => state.searchPageActive;
export const getSearchDetailPageActiveFromState = (state: ViewState) => state.searchDetailPageActive;
export const getRouterSearchActiveFromState = (state: ViewState) => state.routerSearchActive;

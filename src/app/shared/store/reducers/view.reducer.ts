import * as fromViewActions from '../actions/view.action';

export interface ViewState {
  routerSearchActive: boolean;
  searchPageActive: boolean;
  searchDetailPageActive: boolean;
}

export const initialState: ViewState = {
  routerSearchActive: false,
  searchPageActive: false,
  searchDetailPageActive: false
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function viewReducer(
  state = initialState,
  action: fromViewActions.ViewAction
): ViewState {
  switch (action.type) {
    case fromViewActions.SET_ROUTER_SEARCH_ACTIVE: {
      const routerSearchActive = (<fromViewActions.SetRouterSearchActive>action)
        .payload;
      return newState(state, { routerSearchActive });
    }

    case fromViewActions.SET_SEARCH_PAGE_ACTIVE: {
      const searchPageActive = (<fromViewActions.SetSearchPageActive>action)
        .payload;
      return newState(state, { searchPageActive });
    }

    case fromViewActions.SET_SEARCH_DETAIL_PAGE_ACTIVE: {
      const searchDetailPageActive = (<
        fromViewActions.SetSearchDetailPageActive
      >action).payload;
      return newState(state, { searchDetailPageActive });
    }
  }

  return state;
}

export const getSearchPageActiveFromState = (state: ViewState) =>
  state.searchPageActive;
export const getSearchDetailPageActiveFromState = (state: ViewState) =>
  state.searchDetailPageActive;
export const getRouterSearchActiveFromState = (state: ViewState) =>
  state.routerSearchActive;

import * as fromViewActions from '../actions/view.action';
import { CenterView } from '../../../shared/view.enum';

export interface ViewState {
  centerView: CenterView;
  routerSearchActive: boolean;
  searchPageActive: boolean;
}

const initialState: ViewState = {
  centerView: CenterView.STATS,
  routerSearchActive: false,
  searchPageActive: false
};

export function viewReducer(
  state = initialState,
  action: fromViewActions.ViewAction
): ViewState {
  switch (action.type) {
    case fromViewActions.SET_CENTER_VIEW: {
      const centerView = (<fromViewActions.SetCenterView>action).payload;
      return Object.assign({}, state, { centerView });
    }

    case fromViewActions.SET_ROUTER_SEARCH_ACTIVE: {
      const rightViewOpen = (<fromViewActions.SetRouterSearchActive>action).payload;
      return Object.assign({}, state, { rightViewOpen });
    }

    case fromViewActions.SET_SEARCH_PAGE_ACTIVE: {
      const searchPageActive = (<fromViewActions.SetSearchPageActive>action).payload;
      return Object.assign({}, state, { searchPageActive });
    }
  }

  return state;
}

export const getCenterView = (state: ViewState) => state.centerView;
export const getRouterSearchActive = (state: ViewState) => state.routerSearchActive;

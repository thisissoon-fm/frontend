import * as fromViewActions from '../actions/view.action';
import { CenterView } from '../../../shared/view.enum';

export interface ViewState {
  centerView: any;
  rightViewOpen: boolean;
}

const initialState: ViewState = {
  centerView: CenterView.STATS,
  rightViewOpen: false
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

    case fromViewActions.SET_RIGHT_VIEW_OPEN: {
      const rightViewOpen = (<fromViewActions.SetRightViewOpen>action).payload;
      return Object.assign({}, state, { rightViewOpen });
    }
  }

  return state;
}

export const getCenterView = (state: ViewState) => state.centerView;
export const getRightViewOpen = (state: ViewState) => state.rightViewOpen;

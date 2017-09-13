import * as fromView from '../actions/view.action';
import { CenterView } from '../../../shared';

export interface ViewState {
  centerView: CenterView;
  rightViewOpen: boolean;
}

const initialState: ViewState = {
  centerView: CenterView.STATS,
  rightViewOpen: false
};

export function viewReducer(
  state = initialState,
  action: fromView.ViewAction
): ViewState {
  switch (action.type) {
    case fromView.SET_CENTER_VIEW: {
      const centerView = (<fromView.SetCenterView>action).payload;
      return Object.assign({}, state, { centerView });
    }

    case fromView.SET_RIGHT_VIEW_OPEN: {
      const rightViewOpen = (<fromView.SetRightViewOpen>action).payload;
      return Object.assign({}, state, { rightViewOpen });
    }
  }

  return state;
}

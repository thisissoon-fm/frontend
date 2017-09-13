import * as fromView from '../actions/view.action';
import { CenterView, RightView } from '../../shared';

export interface ViewState {
  centerView: CenterView;
  rightView: RightView;
  rightViewOpen: boolean;
}

const initialState: ViewState = {
  centerView: CenterView.STATS,
  rightView: null,
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

    case fromView.SET_RIGHT_VIEW: {
      const rightView = (<fromView.SetRightView>action).payload;
      return Object.assign({}, state, { rightView });
    }

    case fromView.SET_RIGHT_VIEW_OPEN: {
      const rightViewOpen = (<fromView.SetRightViewOpen>action).payload;
      return Object.assign({}, state, { rightViewOpen });
    }
  }

  return state;
}

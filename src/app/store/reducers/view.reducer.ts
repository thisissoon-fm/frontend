import * as fromView from '../actions/view.action';
import { View } from '../../shared';

const initialState: View = View.STATS;

export function viewReducer(
  state = initialState,
  action: fromView.ViewAction
): View {
  switch (action.type) {
    case fromView.SET_VIEW: {
      const view = (<fromView.SetView>action).payload;
      return view;
    }

    case fromView.SET_DEFAULT_VIEW: {
      return initialState;
    }
  }

  return state;
}

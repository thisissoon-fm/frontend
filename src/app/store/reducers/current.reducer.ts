import * as current from '../actions/current.action';
import { QueueItem } from '../../api';

export interface CurrentState {
  loaded: boolean;
  loading: boolean;
  current: QueueItem;
}

const initialState: CurrentState = {
  loaded: false,
  loading: false,
  current: null,
};

export function currentReducer(
  state = initialState,
  action: current.CurrentAction
): CurrentState {
  switch (action.type) {
    case current.LOAD_CURRENT: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true
      });
    }

    case current.LOAD_CURRENT_SUCCESS: {
      const current = (<current.LoadCurrentSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        current
      };
    }

    case current.LOAD_CURRENT_FAIL: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false
      });
    }

    case current.REMOVE_CURRENT_SUCCESS: {
      return Object.assign({}, state, {
        loaded: false,
        loading: false,
        current: null
      });
    }
  }

  return state;
}

export const getCurrentLoaded = (state: CurrentState) => state.loaded;

export const getCurrentLoading = (state: CurrentState) => state.loading;

export const getCurrent = (state: CurrentState) => state.current;

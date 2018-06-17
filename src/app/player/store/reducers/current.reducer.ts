import * as fromCurrent from '../actions/current.action';
import { QueueItem } from '../../../api';

export interface CurrentState {
  loaded: boolean;
  loading: boolean;
  current: QueueItem;
}

export const initialState: CurrentState = {
  loaded: false,
  loading: false,
  current: null
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function currentReducer(
  state = initialState,
  action: fromCurrent.CurrentAction
): CurrentState {
  switch (action.type) {
    case fromCurrent.LOAD_CURRENT: {
      return newState(state, {
        loaded: false,
        loading: true
      });
    }

    case fromCurrent.LOAD_CURRENT_SUCCESS: {
      const current = (<fromCurrent.LoadCurrentSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        current
      };
    }

    case fromCurrent.LOAD_CURRENT_FAIL: {
      return newState(state, {
        loaded: false,
        loading: false
      });
    }

    case fromCurrent.REMOVE_CURRENT_SUCCESS: {
      return newState(state, {
        loaded: false,
        loading: false,
        current: null
      });
    }

    case fromCurrent.ADD_PAUSE_SUCCESS: {
      return newState(state, {
        current: newState(state.current, { paused: true })
      });
    }

    case fromCurrent.REMOVE_PAUSE_SUCCESS: {
      return newState(state, {
        current: newState(state.current, { paused: false })
      });
    }

    case fromCurrent.TIMER_INCREMENT: {
      const player = state.current.player;
      player.elapsed_seconds++;
      player.elapsed_time += 1000;
      player.elapsed_percentage =
        player.elapsed_time / state.current.track.duration;
      return newState(state, {
        current: newState(state.current, { player })
      });
    }
  }

  return state;
}

export const getCurrentLoaded = (state: CurrentState) => state.loaded;
export const getCurrentLoading = (state: CurrentState) => state.loading;
export const getCurrent = (state: CurrentState) => state.current;

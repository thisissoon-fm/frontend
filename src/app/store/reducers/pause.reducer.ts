import * as pause from '../actions/pause.action';

export interface PauseState {
  loaded: boolean;
  loading: boolean;
  pause: boolean;
}

const initialState: PauseState = {
  loaded: false,
  loading: false,
  pause: false,
};

export function pauseReducer(
  state = initialState,
  action: pause.PauseAction
): PauseState {
  switch (action.type) {
    case pause.ADD_PAUSE_SUCCESS: {
      return Object.assign({}, state, {
        paused: true
      });
    }

    case pause.REMOVE_PAUSE_SUCCESS: {
      return Object.assign({}, state, {
        paused: false
      });
    }
  }

  return state;
}

export const getPauseLoaded = (state: PauseState) => state.loaded;

export const getPauseLoading = (state: PauseState) => state.loading;

export const getPause = (state: PauseState) => state.pause;

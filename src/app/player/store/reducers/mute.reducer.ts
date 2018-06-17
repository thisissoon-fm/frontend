import * as fromMute from '../actions/mute.action';
import { Mute } from '../../../api';

export interface MuteState {
  loaded: boolean;
  loading: boolean;
  mute: Mute;
}

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export const initialState: MuteState = {
  loaded: false,
  loading: false,
  mute: null
};

export function muteReducer(
  state = initialState,
  action: fromMute.MuteAction
): MuteState {
  switch (action.type) {
    case fromMute.LOAD_MUTE: {
      return newState(state, {
        loaded: false,
        loading: true
      });
    }

    case fromMute.ADD_MUTE_SUCCESS:
    case fromMute.REMOVE_MUTE_SUCCESS:
    case fromMute.LOAD_MUTE_SUCCESS: {
      const mute = (<
        | fromMute.LoadMuteSuccess
        | fromMute.AddMuteSuccess
        | fromMute.RemoveMuteSuccess
      >action).payload;

      return {
        loaded: true,
        loading: false,
        mute
      };
    }

    case fromMute.LOAD_MUTE_FAIL: {
      return newState(state, {
        loaded: false,
        loading: false
      });
    }
  }

  return state;
}

export const getMuteLoaded = (state: MuteState) => state.loaded;
export const getMuteLoading = (state: MuteState) => state.loading;
export const getMute = (state: MuteState) => state.mute;

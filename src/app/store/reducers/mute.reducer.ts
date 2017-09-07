import * as mute from '../actions/mute.action';
import { Mute } from '../../api';

export interface MuteState {
  loaded: boolean;
  loading: boolean;
  mute: Mute;
}

const initialState: MuteState = {
  loaded: false,
  loading: false,
  mute: null,
};

export function muteReducer(
  state = initialState,
  action: mute.MuteAction
): MuteState {
  switch (action.type) {
    case mute.LOAD_MUTE: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true
      });
    }

    case mute.ADD_MUTE_SUCCESS:
    case mute.REMOVE_MUTE_SUCCESS:
    case mute.LOAD_MUTE_SUCCESS: {
      const mute = (<mute.LoadMuteSuccess | mute.AddMuteSuccess | mute.RemoveMuteSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        mute
      };
    }

    case mute.LOAD_MUTE_FAIL: {
      return Object.assign({}, state, {
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

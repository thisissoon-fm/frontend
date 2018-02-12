import * as fromVolume from '../actions/volume.action';
import { Volume } from '../../../api';

export interface VolumeState {
  loaded: boolean;
  loading: boolean;
  volume: Volume;
}

export const initialState: VolumeState = {
  loaded: false,
  loading: false,
  volume: null
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function volumeReducer(
  state = initialState,
  action: fromVolume.VolumeAction
): VolumeState {
  switch (action.type) {
    case fromVolume.LOAD_VOLUME: {
      return newState(state, {
        loaded: false,
        loading: true
      });
    }

    case fromVolume.SET_VOLUME_SUCCESS:
    case fromVolume.LOAD_VOLUME_SUCCESS: {
      const volume = (<fromVolume.LoadVolumeSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        volume
      };
    }

    case fromVolume.LOAD_VOLUME_FAIL: {
      return newState(state, {
        loaded: false,
        loading: false
      });
    }
  }

  return state;
}

export const getVolumeLoaded = (state: VolumeState) => state.loaded;
export const getVolumeLoading = (state: VolumeState) => state.loading;
export const getVolume = (state: VolumeState) => state.volume;

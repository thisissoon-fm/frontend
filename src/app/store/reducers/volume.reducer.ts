import * as volume from '../actions/volume.action';
import { Volume } from '../../api';

export interface VolumeState {
  loaded: boolean;
  loading: boolean;
  volume: Volume;
}

const initialState: VolumeState = {
  loaded: false,
  loading: false,
  volume: null
};

export function volumeReducer(
  state = initialState,
  action: volume.VolumeAction
): VolumeState {
  switch (action.type) {
    case volume.LOAD_VOLUME: {
      return Object.assign({}, state, {
        loaded: false,
        loading: true
      });
    }

    case volume.SET_VOLUME_SUCCESS:
    case volume.LOAD_VOLUME_SUCCESS: {
      const volume = (<volume.LoadVolumeSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        volume
      };
    }

    case volume.LOAD_VOLUME_FAIL: {
      return Object.assign({}, state, {
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

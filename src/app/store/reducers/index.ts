import { createFeatureSelector, createSelector, ActionReducerMap, combineReducers } from '@ngrx/store';

import * as fromCurrent from './current.reducer';
import * as fromMute from './mute.reducer';
import * as fromPause from './pause.reducer';
import * as fromQueue from './queue.reducer';
import * as fromVolume from './volume.reducer';
import * as fromUser from './user.reducer';


export interface PlayerState {
  current: fromCurrent.CurrentState;
  mute: fromMute.MuteState;
  pause: fromPause.PauseState;
  queue: fromQueue.QueueState;
  user: fromUser.UserState;
  volume: fromVolume.VolumeState;
}

export const reducers = {
  current: fromCurrent.currentReducer,
  mute: fromMute.muteReducer,
  pause: fromPause.pauseReducer,
  queue: fromQueue.queueReducer,
  user: fromUser.userReducer,
  volume: fromVolume.volumeReducer
};


export const getPlayerState = createFeatureSelector<PlayerState>('player');


export const getCurrentState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.current
);

export const getCurrent = createSelector(
  getCurrentState,
  (state: fromCurrent.CurrentState) => state.current
);

export const getQueueState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.queue
);

export const getQueue = createSelector(
  getQueueState,
  fromQueue.getQueue
);

export const getQueueMeta = createSelector(
  getQueueState,
  fromQueue.getMeta
);

export const getMuteState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.mute
);

export const getMute = createSelector(
  getMuteState,
  fromMute.getMute
);

export const getVolumeState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.volume
);

export const getVolume = createSelector(
  getVolumeState,
  fromVolume.getVolume
);

export const getPauseState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.pause
);

export const getPause = createSelector(
  getPauseState,
  fromPause.getPause
);

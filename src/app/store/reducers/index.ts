import { createFeatureSelector, createSelector } from '@ngrx/store';

import { View } from '../../shared';

import * as fromCurrent from './current.reducer';
import * as fromMute from './mute.reducer';
import * as fromQueue from './queue.reducer';
import * as fromView from './view.reducer';
import * as fromVolume from './volume.reducer';
import * as fromUser from './user.reducer';

// TODO: split into multiple states
export interface PlayerState {
  current: fromCurrent.CurrentState;
  mute: fromMute.MuteState;
  queue: fromQueue.QueueState;
  user: fromUser.UserState;
  view: fromView.ViewState;
  volume: fromVolume.VolumeState;
}

export const reducers = {
  current: fromCurrent.currentReducer,
  mute: fromMute.muteReducer,
  queue: fromQueue.queueReducer,
  user: fromUser.userReducer,
  view: fromView.viewReducer,
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

export const getViewState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.view
);

export const getView = createSelector(
  getViewState,
  (state: fromView.ViewState) => state.view
);

export const getSidebarOpen = createSelector(
  getViewState,
  (state: fromView.ViewState) => state.sidebarOpen
);

export { ViewState } from './view.reducer';

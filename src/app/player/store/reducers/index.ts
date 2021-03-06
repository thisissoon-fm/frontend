import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCurrent from './current.reducer';
import * as fromMute from './mute.reducer';
import * as fromStats from './stats.reducer';
import * as fromQueue from './queue.reducer';
import * as fromVolume from './volume.reducer';

export interface PlayerState {
  current: fromCurrent.CurrentState;
  mute: fromMute.MuteState;
  queue: fromQueue.QueueState;
  volume: fromVolume.VolumeState;
  stats: fromStats.StatsState;
}

export const reducers = {
  current: fromCurrent.currentReducer,
  mute: fromMute.muteReducer,
  queue: fromQueue.queueReducer,
  volume: fromVolume.volumeReducer,
  stats: fromStats.statsReducer
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

export const getQueue = createSelector(getQueueState, fromQueue.getQueue);

export const getQueueLoading = createSelector(
  getQueueState,
  fromQueue.getQueueLoading
);

export const getQueueMeta = createSelector(getQueueState, fromQueue.getMeta);

export const getQueuePagination = createSelector(
  getQueueState,
  fromQueue.getPagination
);

export const getMuteState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.mute
);

export const getMute = createSelector(getMuteState, fromMute.getMute);

export const getVolumeState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.volume
);

export const getVolume = createSelector(getVolumeState, fromVolume.getVolume);

export const getStatsState = createSelector(
  getPlayerState,
  (state: PlayerState) => state.stats
);

export const getStats = createSelector(getStatsState, fromStats.getStats);

export { StatsState } from './stats.reducer';

export const getLoadedState = createSelector(
  getPlayerState,
  (state: PlayerState) =>
    state.queue.loaded &&
    state.current.loaded &&
    state.mute.loaded &&
    state.volume.loaded
);

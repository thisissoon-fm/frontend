import * as fromStats from '../actions/stats.action';

export interface StatsState {
  loaded: boolean;
  loading: boolean;
  stats: any;
}

export const initialState: StatsState = {
  loaded: false,
  loading: false,
  stats: null
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function statsReducer(
  state = initialState,
  action: fromStats.StatsAction
): StatsState {
  switch (action.type) {
    case fromStats.LOAD_STATS: {
      return newState(state, {
        loaded: false,
        loading: true
      });
    }

    case fromStats.LOAD_STATS_SUCCESS: {
      const stats = (<fromStats.LoadStatsSuccess>action).payload;

      return {
        loaded: true,
        loading: false,
        stats
      };
    }

    case fromStats.LOAD_STATS_FAIL: {
      return newState(state, {
        loaded: false,
        loading: false,
      });
    }
  }

  return state;
}

export const getStatsLoaded = (state: StatsState) => state.loaded;
export const getStatsLoading = (state: StatsState) => state.loading;
export const getStats = (state: StatsState) => state.stats;

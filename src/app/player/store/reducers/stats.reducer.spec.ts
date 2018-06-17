import * as statsReducer from './stats.reducer';
import * as statsAction from '../actions/stats.action';

describe('statsReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = statsReducer.statsReducer(undefined, {} as any);

      expect(result).toEqual(statsReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load stats request', () => {
      const expected = { ...statsReducer.initialState, loading: true };
      const action = new statsAction.LoadStats();
      const result = statsReducer.statsReducer(
        statsReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load stats fail', () => {
      const expected = { ...statsReducer.initialState, loading: false };
      const action = new statsAction.LoadStatsFail(null);
      const result = statsReducer.statsReducer(
        { ...statsReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load stats', () => {
      const stats = { stats: true };
      const expected = { loaded: true, loading: false, stats };
      const action = new statsAction.LoadStatsSuccess(stats);
      const result = statsReducer.statsReducer(
        { ...statsReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    const stats = { stats: {} };
    it('should get stats', () => {
      const expected = stats;
      const result = statsReducer.getStats({
        ...statsReducer.initialState,
        stats
      });
      expect(result).toEqual(expected);
    });

    it('should get stats loading', () => {
      const expected = false;
      const result = statsReducer.getStatsLoading(statsReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get stats loaded', () => {
      const expected = false;
      const result = statsReducer.getStatsLoaded(statsReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

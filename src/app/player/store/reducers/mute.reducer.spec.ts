import * as muteReducer from './mute.reducer';
import * as muteAction from '../actions/mute.action';

describe('MuteReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = muteReducer.muteReducer(undefined, {} as any);

      expect(result).toEqual(muteReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load mute request', () => {
      const expected = { ...muteReducer.initialState, loading: true };
      const action = new muteAction.LoadMute();
      const result = muteReducer.muteReducer(muteReducer.initialState, action);

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load mute fail', () => {
      const expected = { ...muteReducer.initialState, loading: false };
      const action = new muteAction.LoadMuteFail(null);
      const result = muteReducer.muteReducer(
        { ...muteReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load mute', () => {
      const mute = { mute: true };
      const expected = { loaded: true, loading: false, mute };
      const action = new muteAction.LoadMuteSuccess(mute);
      const result = muteReducer.muteReducer(
        { ...muteReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Add', () => {
    const mute = { mute: true };
    it('should add mute', () => {
      const expected = { loading: false, loaded: true, mute };
      const action = new muteAction.AddMuteSuccess(mute);
      const result = muteReducer.muteReducer(
        { loaded: true, loading: true, mute: { mute: false } },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Remove', () => {
    const mute = { mute: false };
    it('should remove mute', () => {
      const expected = { loading: false, loaded: true, mute };
      const action = new muteAction.AddMuteSuccess(mute);
      const result = muteReducer.muteReducer(
        { loaded: true, loading: true, mute: { mute: true } },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    const mute = { mute: true };
    it('should get mute', () => {
      const expected = mute;
      const result = muteReducer.getMute({ ...muteReducer.initialState, mute });
      expect(result).toEqual(expected);
    });

    it('should get mute loading', () => {
      const expected = false;
      const result = muteReducer.getMuteLoading(muteReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get mute loaded', () => {
      const expected = false;
      const result = muteReducer.getMuteLoaded(muteReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

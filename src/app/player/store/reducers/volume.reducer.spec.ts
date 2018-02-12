import * as volumeReducer from './volume.reducer';
import * as volumeAction from '../actions/volume.action';

describe('volumeReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = volumeReducer.volumeReducer(undefined, {} as any);

      expect(result).toEqual(volumeReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load volume request', () => {
      const expected = { ...volumeReducer.initialState, loading: true };
      const action = new volumeAction.LoadVolume();
      const result = volumeReducer.volumeReducer(
        volumeReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load volume fail', () => {
      const expected = { ...volumeReducer.initialState, loading: false };
      const action = new volumeAction.LoadVolumeFail(null);
      const result = volumeReducer.volumeReducer(
        { ...volumeReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load volume', () => {
      const volume = { volume: 50 };
      const expected = { loaded: true, loading: false, volume};
      const action = new volumeAction.LoadVolumeSuccess(volume);
      const result = volumeReducer.volumeReducer(
        { ...volumeReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Set', () => {
    const volume = { volume: 50 };
    it('should add volume', () => {
      const expected = { loading: false, loaded: true, volume };
      const action = new volumeAction.SetVolumeSuccess(volume);
      const result = volumeReducer.volumeReducer(
        { loaded: true, loading: true, volume: { volume: 25 }},
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    const volume = { volume: 50 };
    it('should get volume', () => {
      const expected = volume;
      const result = volumeReducer.getVolume({...volumeReducer.initialState, volume});
      expect(result).toEqual(expected);
    });

    it('should get volume loading', () => {
      const expected = false;
      const result = volumeReducer.getVolumeLoading(volumeReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get volume loaded', () => {
      const expected = false;
      const result = volumeReducer.getVolumeLoaded(volumeReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

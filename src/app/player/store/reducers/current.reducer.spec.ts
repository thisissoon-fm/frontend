import * as currentReducer from './current.reducer';
import * as currentAction from '../actions/current.action';

// tslint:disable-next-line:max-line-length
export const current = {
  track: {
    album: {
      id: '0890b078-f64d-4871-be9a-138a3e90260a',
      images: [
        {
          url:
            'https://i.scdn.co/image/d5b91f9fd71688b8ee8e4fbb1653320fb504b6cf',
          width: 640,
          height: 640
        },
        {
          url:
            'https://i.scdn.co/image/69c35ae0a3647b0df47fccd87f62271b74d99b04',
          width: 300,
          height: 300
        },
        {
          url:
            'https://i.scdn.co/image/eed3e0fb249e836191378701a81830464648f6dc',
          width: 64,
          height: 64
        }
      ],
      name: 'channel ORANGE (Explicit Version)',
      uri: 'spotify:album:623Ef2ZEB3Njklix4PC0Rs'
    },
    name: 'Thinkin Bout You',
    uri: 'spotify:track:5mphdlILgAq3vh1MSvAJTS',
    play_count: 0,
    artists: [
      {
        id: 'f097707f-478b-4156-987e-b6cb03dedb3e',
        uri: 'spotify:artist:2h93pZq0e7k5yf4dywlkpM',
        name: 'Frank Ocean'
      }
    ],
    duration: 200746,
    id: '58d996e8-a6d0-460f-b85d-d51bfe93af66'
  },
  player: { elapsed_time: 0, elapsed_seconds: 0.0, elapsed_percentage: 0.0 },
  user: {
    family_name: 'Opare-Aryee',
    display_name: 'Edward Opare-Aryee',
    avatar_url:
      'https://lh4.googleusercontent.com/-28HClpLQXVg/AAAAAAAAAAI/AAAAAAAAAIo/JMQCw6V7Zuk/photo.jpg',
    spotify_playlists: null,
    given_name: 'Edward',
    id: '646d6d63-225a-4301-a55a-447ffa9a0cbe'
  }
};

describe('CurrentReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = currentReducer.currentReducer(undefined, {} as any);

      expect(result).toEqual(currentReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load current request', () => {
      const expected = { ...currentReducer.initialState, loading: true };
      const action = new currentAction.LoadCurrent();
      const result = currentReducer.currentReducer(
        currentReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load current fail', () => {
      const expected = { ...currentReducer.initialState, loading: false };
      const action = new currentAction.LoadCurrentFail(null);
      const result = currentReducer.currentReducer(
        { ...currentReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load current item', () => {
      const expected = {
        ...currentReducer.initialState,
        loaded: true,
        loading: false,
        current
      };
      const action = new currentAction.LoadCurrentSuccess(current);
      const result = currentReducer.currentReducer(
        { ...currentReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Remove', () => {
    it('should remove current item', () => {
      const expected = currentReducer.initialState;
      const action = new currentAction.RemoveCurrentSuccess(null);
      const result = currentReducer.currentReducer(
        { ...currentReducer.initialState, current, loaded: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Pause', () => {
    it('should pause current item', () => {
      const expected = {
        ...currentReducer.initialState,
        current: { ...current, paused: true }
      };
      const action = new currentAction.AddPauseSuccess(null);
      const result = currentReducer.currentReducer(
        {
          ...currentReducer.initialState,
          current: { ...current, paused: false }
        },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should unpause current item', () => {
      const expected = {
        ...currentReducer.initialState,
        current: { ...current, paused: false }
      };
      const action = new currentAction.RemovePauseSuccess(null);
      const result = currentReducer.currentReducer(
        {
          ...currentReducer.initialState,
          current: { ...current, paused: true }
        },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Timer', () => {
    it('should increment timer', () => {
      const expected = {
        ...currentReducer.initialState,
        current: {
          ...current,
          player: {
            elapsed_seconds: 1,
            elapsed_time: 1000,
            elapsed_percentage: 1000 / 200746
          }
        }
      };
      const action = new currentAction.TimerIncrement();
      const result = currentReducer.currentReducer(
        { ...currentReducer.initialState, current },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    it('should get current item', () => {
      const expected = current;
      const result = currentReducer.getCurrent({
        ...currentReducer.initialState,
        current
      });
      expect(result).toEqual(expected);
    });

    it('should get current loading', () => {
      const expected = false;
      const result = currentReducer.getCurrentLoading(
        currentReducer.initialState
      );
      expect(result).toEqual(expected);
    });

    it('should get current loaded', () => {
      const expected = false;
      const result = currentReducer.getCurrentLoaded(
        currentReducer.initialState
      );
      expect(result).toEqual(expected);
    });
  });
});

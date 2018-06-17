import * as userReducer from './user.reducer';
import * as userAction from '../actions/user.action';
import { user } from '../../../../testing/mock-user';

describe('userReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = userReducer.userReducer(undefined, {} as any);

      expect(result).toEqual(userReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load me request', () => {
      const expected = { ...userReducer.initialState, loading: true };
      const action = new userAction.LoadMe();
      const result = userReducer.userReducer(userReducer.initialState, action);

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load me fail', () => {
      const expected = { ...userReducer.initialState, loading: false };
      const action = new userAction.LoadMeFail(null);
      const result = userReducer.userReducer(
        { ...userReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load user', () => {
      const expected = {
        ...userReducer.initialState,
        loaded: true,
        loading: false,
        user,
        authenticated: true
      };
      const action = new userAction.LoadMeSuccess(user);
      const result = userReducer.userReducer(
        { ...userReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    it('should get user', () => {
      const expected = user;
      const result = userReducer.getUser({ ...userReducer.initialState, user });
      expect(result).toEqual(expected);
    });

    it('should get user loading', () => {
      const expected = false;
      const result = userReducer.getUserLoading(userReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get user loaded', () => {
      const expected = false;
      const result = userReducer.getUserLoaded(userReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get user authenicated', () => {
      const expected = false;
      const result = userReducer.getUserAuthenticated(userReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

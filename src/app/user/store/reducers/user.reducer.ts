import * as fromUser from '../actions/user.action';
import { User } from '../../../api';

export interface UserState {
  loaded: boolean;
  loading: boolean;
  user: User;
  authenticated: boolean;
}

export const initialState: UserState = {
  loaded: false,
  loading: false,
  user: null,
  authenticated: false
};

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export function userReducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.LOAD_ME: {
      return newState(state, {
        loaded: false,
        loading: true
      });
    }

    case fromUser.LOAD_ME_SUCCESS: {
      const user = (<fromUser.LoadMeSuccess>action).payload;

      return newState(state, {
        loaded: true,
        loading: false,
        user,
        authenticated: true
      });
    }

    case fromUser.LOAD_ME_FAIL: {
      return newState(state, {
        loaded: false,
        loading: false,
        user: null,
        authenticated: false
      });
    }
  }

  return state;
}

export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserAuthenticated = (state: UserState) => state.authenticated;
export const getUser = (state: UserState) => state.user;

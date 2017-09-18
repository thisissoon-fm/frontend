import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export const reducers = fromUser.userReducer;

export const getUserState = createFeatureSelector<fromUser.UserState>('user');

export const getUserLoaded = createSelector(
  getUserState,
  fromUser.getUserLoaded
);

export const getUserLoading = createSelector(
  getUserState,
  fromUser.getUserLoading
);

export const getUserAuthenticated = createSelector(
  getUserState,
  fromUser.getUserAuthenticated
);

export const getUser = createSelector(
  getUserState,
  fromUser.getUser
);

export { UserState } from './user.reducer';


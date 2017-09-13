import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';

export const reducers = fromUser.userReducer;

export const getUserState = createFeatureSelector<fromUser.UserState>('user');

export * from './user.reducer';

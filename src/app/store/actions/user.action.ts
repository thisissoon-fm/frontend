import { Action } from '@ngrx/store';
import { User } from '../../api';

export const LOAD_ME               = '[User] Load Me';
export const LOAD_ME_FAIL          = '[User] Load Me Fail';
export const LOAD_ME_SUCCESS       = '[User] Load Me Success';
export const LOAD_USER             = '[User] Load User';
export const LOAD_USER_FAIL        = '[User] Load User Fail';
export const LOAD_USER_SUCCESS     = '[User] Load User Success';


/**
 * Load User Actions
 */
export class LoadMe implements Action {
  readonly type = LOAD_ME;
}

export class LoadMeSuccess implements Action {
  readonly type = LOAD_ME_SUCCESS;

  constructor(public payload: User) { }
}

export class LoadMeFail implements Action {
  readonly type = LOAD_ME_FAIL;

  constructor(public payload: any) { }
}

/**
 * Load User Actions
 */
export class LoadUser implements Action {
  readonly type = LOAD_USER;

  constructor(public payload: string) { }
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: User) { }
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;

  constructor(public payload: any) { }
}

export type UserAction =
  | LoadMe
  | LoadMeSuccess
  | LoadMeFail
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail;

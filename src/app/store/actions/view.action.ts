import { Action } from '@ngrx/store';
import { View } from '../../shared';

export const SET_VIEW             = '[View] Set View';
export const SET_DEFAULT_VIEW     = '[View] Set Default View';

/**
 * Set view actions
 */
export class SetView implements Action {
  readonly type = SET_VIEW;

  constructor(public payload: View) { }
}

export class SetDefaultView implements Action {
  readonly type = SET_DEFAULT_VIEW;
}


export type ViewAction =
  | SetView
  | SetDefaultView;

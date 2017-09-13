import { Action } from '@ngrx/store';
import { CenterView, RightView } from '../../shared';

export const SET_CENTER_VIEW             = '[View] Set Center View';
export const SET_RIGHT_VIEW_OPEN         = '[View] Set Right view Open';

/**
 * Set view actions
 */
export class SetCenterView implements Action {
  readonly type = SET_CENTER_VIEW;

  constructor(public payload: CenterView) { }
}

export class SetRightViewOpen implements Action {
  readonly type = SET_RIGHT_VIEW_OPEN;

  constructor(public payload: boolean) { }
}


export type ViewAction =
  | SetCenterView
  | SetRightViewOpen;

import { Action } from '@ngrx/store';

export const LOAD_STATS = '[Stats] Load Stats';
export const LOAD_STATS_FAIL = '[Stats] Load Stats Fail';
export const LOAD_STATS_SUCCESS = '[Stats] Load Stats Success';

/**
 * Load stats Actions
 */
export class LoadStats implements Action {
  readonly type = LOAD_STATS;
}

export class LoadStatsSuccess implements Action {
  readonly type = LOAD_STATS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadStatsFail implements Action {
  readonly type = LOAD_STATS_FAIL;

  constructor(public payload: any) {}
}

export type StatsAction = LoadStats | LoadStatsSuccess | LoadStatsFail;

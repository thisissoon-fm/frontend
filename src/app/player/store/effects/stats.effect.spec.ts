import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { StatsEffects } from './stats.effect';
import * as actions from '../actions/stats.action';
import { StatsService } from '../../../api';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('StatsEffects', () => {
  let effects: StatsEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockStatsService;
  let stats;

  beforeEach(() => {
    stats = {};

    mockStatsService = {
      get: jasmine.createSpy('get').and.returnValue(of({}))
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        StatsEffects,
        { provide: Actions, useFactory: getActions },
        { provide: StatsService, useFactory: () => mockStatsService }
      ]
    });

    effects = testBed.get(StatsEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadStats$', () => {
    it('should return a StatsAction.LoadStatsSuccess, with Stats, on success', () => {
      const action = new actions.LoadStats();
      const completion = new actions.LoadStatsSuccess(stats);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: stats });
      const expected = cold('--b', { b: completion });
      mockStatsService.get.and.callFake(() => response);

      expect(effects.loadStats$).toBeObservable(expected);
    });

    it('should return a StatsAction.LoadStatsFail, with error, on fail', () => {
      const action = new actions.LoadStats();
      const error = { status: 500 };
      const completion = new actions.LoadStatsFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockStatsService.get.and.callFake(() => response);

      expect(effects.loadStats$).toBeObservable(expected);
    });
  });
});

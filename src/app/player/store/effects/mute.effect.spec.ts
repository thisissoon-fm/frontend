import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable, EMPTY, of as observableOf } from 'rxjs';

import { MuteEffects } from './mute.effect';
import * as actions from '../actions/mute.action';
import { MuteService } from '../../../api';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('MuteEffects', () => {
  let effects: MuteEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockMuteService;
  let mute;

  beforeEach(() => {
    mute = { mute: true };

    mockMuteService = {
      get: jasmine
        .createSpy('get')
        .and.returnValue(observableOf({ mute: true })),
      post: jasmine
        .createSpy('post')
        .and.returnValue(observableOf({ mute: true })),
      delete: jasmine
        .createSpy('delete')
        .and.returnValue(observableOf({ mute: false }))
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        MuteEffects,
        { provide: Actions, useFactory: getActions },
        { provide: MuteService, useFactory: () => mockMuteService }
      ]
    });

    effects = testBed.get(MuteEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadMute$', () => {
    it('should return a muteAction.LoadMuteSuccess, with mute, on success', () => {
      const action = new actions.LoadMute();
      const completion = new actions.LoadMuteSuccess({ mute: true });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mute });
      const expected = cold('--b', { b: completion });
      mockMuteService.get.and.callFake(() => response);

      expect(effects.loadMute$).toBeObservable(expected);
    });

    it('should return a muteAction.LoadMuteFail, with error, on fail', () => {
      const action = new actions.LoadMute();
      const error = { status: 500 };
      const completion = new actions.LoadMuteFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockMuteService.get.and.callFake(() => response);

      expect(effects.loadMute$).toBeObservable(expected);
    });
  });

  describe('addMute$', () => {
    it('should request to add mute', () => {
      const action = new actions.AddMute();
      const completion = mute;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mute });
      const expected = cold('--b', { b: completion });
      mockMuteService.post.and.callFake(() => response);

      expect(effects.addMute$).toBeObservable(expected);
      expect(mockMuteService.post).toHaveBeenCalled();
    });

    it('should throw error', () => {
      const action = new actions.AddMute();
      const error = { status: 500 };
      const completion = error;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockMuteService.post.and.callFake(() => response);

      expect(effects.addMute$).toBeObservable(expected);
      expect(mockMuteService.post).toHaveBeenCalled();
    });
  });

  describe('removeMute$', () => {
    it('should request to remove mute', () => {
      const action = new actions.RemoveMute();
      const completion = mute;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: mute });
      const expected = cold('--b', { b: completion });
      mockMuteService.delete.and.callFake(() => response);

      expect(effects.removeMute$).toBeObservable(expected);
      expect(mockMuteService.delete).toHaveBeenCalled();
    });

    it('should throw error', () => {
      const action = new actions.RemoveMute();
      const error = { status: 500 };
      const completion = error;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockMuteService.delete.and.callFake(() => response);

      expect(effects.removeMute$).toBeObservable(expected);
      expect(mockMuteService.delete).toHaveBeenCalled();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { CurrentEffects } from './current.effect';
import * as actions from '../actions/current.action';
import { QueueItem, PauseService, CurrentService } from '../../../api';
import { NotificationService } from '../../../notification';
import { UtilsService } from '../../../shared';

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

describe('CurrentEffects', () => {
  let effects: CurrentEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockNotificationService;
  let mockCurrentService;
  let mockPauseService;
  let mockTitle;

  const current = {
    uuid: '111',
    track: { name: '', artists: [], album: { images: [] } }
  } as QueueItem;
  const pagination = { totalCount: 2, currentPage: 1, totalPages: 1 };

  beforeEach(() => {
    mockCurrentService = {
      get: jasmine.createSpy('query').and.returnValue(of(current)),
      delete: jasmine.createSpy('remove').and.returnValue(of({}))
    };

    mockTitle = {
      setTitle: jasmine.createSpy('mockTitle')
    };

    mockPauseService = {
      post: jasmine.createSpy('post'),
      delete: jasmine.createSpy('delete')
    };

    mockNotificationService = {
      push: jasmine.createSpy('push')
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        CurrentEffects,
        { provide: Actions, useFactory: getActions },
        { provide: CurrentService, useFactory: () => mockCurrentService },
        { provide: PauseService, useFactory: () => mockPauseService },
        { provide: Title, useFactory: () => mockTitle },
        {
          provide: NotificationService,
          useFactory: () => mockNotificationService
        },
        UtilsService
      ]
    });

    effects = testBed.get(CurrentEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadCurrent$', () => {
    it('should return a currentAction.LoadCurrentSuccess, with current items, on success', () => {
      const action = new actions.LoadCurrent();
      const completion = new actions.LoadCurrentSuccess(current);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: current });
      const expected = cold('--b', { b: completion });
      mockCurrentService.get.and.callFake(() => response);

      expect(effects.loadCurrent$).toBeObservable(expected);
    });

    it('should return a currentAction.LoadCurrentFail, with error, on fail', () => {
      const action = new actions.LoadCurrent();
      const error = { status: 500 };
      const completion = new actions.LoadCurrentFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockCurrentService.get.and.callFake(() => response);

      expect(effects.loadCurrent$).toBeObservable(expected);
    });
  });

  describe('loadCurrentSucess$', () => {
    it('should push notification', () => {
      const action = new actions.LoadCurrentSuccess(current);
      const completion = current;

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadCurrentSucess$).toBeObservable(expected);
      expect(mockNotificationService.push).toHaveBeenCalled();
    });
  });

  describe('removeCurrentSuccess$', () => {
    it('should reset title', () => {
      const action = new actions.RemoveCurrentSuccess({});
      const completion = new actions.RemoveCurrentSuccess({});

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.removeCurrentSuccess$).toBeObservable(expected);
      expect(mockTitle.setTitle).toHaveBeenCalled();
    });
  });

  describe('removeCurrent$', () => {
    it('should request to delete current', () => {
      const action = new actions.RemoveCurrent();
      const completion = null;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: null });
      const expected = cold('--b', { b: completion });
      mockCurrentService.delete.and.callFake(() => response);

      expect(effects.removeCurrent$).toBeObservable(expected);
      expect(mockCurrentService.delete).toHaveBeenCalled();
    });

    it('should throw error', () => {
      const action = new actions.RemoveCurrent();
      const error = { status: 500 };
      const completion = error;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockCurrentService.delete.and.callFake(() => response);

      expect(effects.removeCurrent$).toBeObservable(expected);
      expect(mockCurrentService.delete).toHaveBeenCalled();
    });
  });

  describe('addPause$', () => {
    it('should request to pause current', () => {
      const action = new actions.AddPause();
      const completion = { paused: true };

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { paused: true } });
      const expected = cold('--b', { b: completion });
      mockPauseService.post.and.callFake(() => response);

      expect(effects.addPause$).toBeObservable(expected);
      expect(mockPauseService.post).toHaveBeenCalled();
    });

    it('should throw error', () => {
      const action = new actions.AddPause();
      const error = { status: 500 };
      const completion = error;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockPauseService.post.and.callFake(() => response);

      expect(effects.addPause$).toBeObservable(expected);
      expect(mockPauseService.post).toHaveBeenCalled();
    });
  });

  describe('removePause$', () => {
    it('should request to remove pause', () => {
      const action = new actions.RemovePause();
      const completion = { paused: false };

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { paused: false } });
      const expected = cold('--b', { b: completion });
      mockPauseService.delete.and.callFake(() => response);

      expect(effects.removePause$).toBeObservable(expected);
      expect(mockPauseService.delete).toHaveBeenCalled();
    });
  });

  it('should throw error', () => {
    const action = new actions.RemovePause();
    const error = { status: 500 };
    const completion = error;

    actions$.stream = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    const expected = cold('--b', { b: completion });
    mockPauseService.delete.and.callFake(() => response);

    expect(effects.removePause$).toBeObservable(expected);
    expect(mockPauseService.delete).toHaveBeenCalled();
  });
});

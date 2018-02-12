import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';

import { QueueEffects } from './queue.effect';
import { QueueState } from '../reducers/queue.reducer';
import * as actions from '../actions/queue.action';
import { QueueItem, QueueService, TrackService, UserService } from '../../../api';
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

describe('QueueEffects', () => {
  let effects: QueueEffects;
  let actions$: TestActions;
  let mockQueueService;
  let mockTrackService;
  let mockUserService;
  let mockStore;
  let mockNotificationService;

  const queueItem1 = { uuid: '111' } as QueueItem;
  const queueItem2 = { uuid: '222' } as QueueItem;
  const items = [queueItem1, queueItem2];
  const pagination = { totalCount: 2, currentPage: 1, totalPages: 1 };

  beforeEach(() => {
    mockQueueService = {
      query: jasmine.createSpy('query').and.returnValue(of(items)),
      post: jasmine.createSpy('post').and.returnValue(of({})),
      delete: jasmine.createSpy('remove').and.returnValue(of({})),
      getMeta: jasmine.createSpy('meta').and.returnValue(of({}))
    };

    mockTrackService = {
      get: jasmine.createSpy('trackGet').and.returnValue(of({}))
    };

    mockUserService = {
      get: jasmine.createSpy('userGet').and.returnValue(of({}))
    };

    mockNotificationService = {
      push: jasmine.createSpy('push')
    };

    mockStore = {
      select: jasmine.createSpy('select').and.returnValue(of(pagination))
    };

    TestBed.configureTestingModule({
      providers: [
        QueueEffects,
        { provide: Actions, useFactory: getActions },
        { provide: Store, useFactory: () => mockStore },
        { provide: QueueService, useFactory: () => mockQueueService },
        { provide: TrackService, useFactory: () => mockTrackService },
        { provide: UserService, useFactory: () => mockUserService },
        { provide: NotificationService, useFactory: () => mockNotificationService },
        UtilsService
      ],
    });

    effects = TestBed.get(QueueEffects);
    actions$ = TestBed.get(Actions);
  });

  describe('loadQueue$', () => {
    it('should return a queueAction.LoadQueueSuccess, with queue items, on success', () => {
      const action = new actions.LoadQueue();
      const completion = new actions.LoadQueueSuccess({ items, pagination });

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: { items, pagination } });
      const expected = cold('--b', { b: completion });
      mockQueueService.query.and.callFake(() => response);

      expect(effects.loadQueue$).toBeObservable(expected);
    });

    it('should return a queueAction.LoadQueueFail, with error, on fail', () => {
      const action = new actions.LoadQueue();
      const error = { status: 500 };
      const completion = new actions.LoadQueueFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockQueueService.query.and.callFake(() => response);

      expect(effects.loadQueue$).toBeObservable(expected);
    });
  });

  describe('loadNextQueuePage$', () => {
    it('should return a queueAction.LoadNextQueuePageSuccess, with queue items, on success', () => {
      const action = new actions.LoadNextQueuePage();
      const completion = new actions.LoadNextQueuePageSuccess({ items, pagination });

      actions$.stream = hot('-a', { a: action });
      const responseSelect = hot('a|', { a: pagination } );
      const response = cold('-a|', { a: { items, pagination } });
      const expected = cold('--b', { b: completion });
      mockStore.select.and.callFake(() => responseSelect);
      mockQueueService.query.and.callFake(() => response);

      expect(effects.loadNextQueuePage$).toBeObservable(expected);
    });

    it('should return a queueAction.LoadNextQueuePageFail, with error, on fail', () => {
      const action = new actions.LoadNextQueuePage();
      const error = { status: 500 };
      const completion = new actions.LoadNextQueuePageFail(error);

      actions$.stream = hot('-a', { a: action });
      const responseQueue = cold('-#|', {}, error);
      const responseSelect = cold('-a|', { a: pagination });
      const expected = cold('--b', { b: completion });
      mockQueueService.query.and.callFake(() => responseQueue);
      mockStore.select.and.callFake(() => responseSelect);

      expect(effects.loadNextQueuePage$).toBeObservable(expected);
    });
  });

  describe('addToQueue$', () => {
    it('should return a queueAction.QueueAddSuccess on success', () => {
      const action = new actions.QueueAdd('foo');
      const completion = new actions.QueueAddSuccess({});

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: {} });
      const expected = cold('--b', { b: completion });
      mockQueueService.post.and.callFake(() => response);

      expect(effects.addToQueue$).toBeObservable(expected);
    });

    it('should return a queueAction.QueueAddFail, with error, on fail', () => {
      const action = new actions.QueueAdd('foo');
      const error = { status: 500 };
      const completion = new actions.QueueAddFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockQueueService.post.and.callFake(() => response);

      expect(effects.addToQueue$).toBeObservable(expected);
    });
  });

  describe('removeFromQueue$', () => {
    it('should return a queueAction.QueueRemoveSuccess on success', () => {
      const action = new actions.QueueRemove('foo');

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: {} });
      const expected = cold('--b', { b: {} });
      mockQueueService.delete.and.callFake(() => response);

      expect(effects.removeFromQueue$).toBeObservable(expected);
    });

    it('should return a queueAction.QueueRemoveFail, with error, on fail', () => {
      const action = new actions.QueueRemove('foo');
      const error = { status: 500 };

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: error });
      TestBed.get(QueueService).delete.and.callFake(() => response);

      expect(effects.removeFromQueue$).toBeObservable(expected);
    });
  });

  describe('loadQueueMeta$', () => {
    it('should return a queueAction.LoadQueueMetaSuccess on success', () => {
      const action = new actions.LoadQueueMeta();
      const completion = new actions.LoadQueueMetaSuccess({} as any);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: {} });
      const expected = cold('--b', { b: completion });
      mockQueueService.getMeta.and.callFake(() => response);

      expect(effects.loadQueueMeta$).toBeObservable(expected);
    });

    it('should return a queueAction.LoadQueueMetaFail, with error, on fail', () => {
      const action = new actions.LoadQueueMeta();
      const error = { status: 500 };
      const completion = new actions.LoadQueueMetaFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockQueueService.getMeta.and.callFake(() => response);

      expect(effects.loadQueueMeta$).toBeObservable(expected);
    });
  });

  describe('loadQueueItem$', () => {
    it('should return a queueAction.LoadQueueItemSuccess on success', () => {
      const action = new actions.LoadQueueItem({id: 'foo'} as any);
      const completion = new actions.LoadQueueItemSuccess({ uuid: 'foo', track: {}, user: {}} as any);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: {} });
      const expected = cold('--b', { b: completion });
      mockUserService.get.and.callFake(() => response);
      mockTrackService.get.and.callFake(() => response);

      expect(effects.loadQueueItem$).toBeObservable(expected);
    });

    it('should return a queueAction.LoadQueueItemFail, with error, on fail', () => {
      const action = new actions.LoadQueueItem({} as any);
      const error = { status: 500 };
      const completion = new actions.LoadQueueItemFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockUserService.get.and.callFake(() => response);
      mockTrackService.get.and.callFake(() => response);

      expect(effects.loadQueueItem$).toBeObservable(expected);
    });
  });

  describe('loadQueueItemSuccess$', () => {
    it('should send notification', () => {
      const track = {
        user: { given_name: '' },
        track: { name: '', artists: [] }
      };
      const action = new actions.LoadQueueItemSuccess(track as any);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: track });

      expect(effects.loadQueueItemSuccess$).toBeObservable(expected);
      expect(mockNotificationService.push).toHaveBeenCalled();
    });
  });
});

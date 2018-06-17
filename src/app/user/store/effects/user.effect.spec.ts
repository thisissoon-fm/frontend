import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { UserEffects } from './user.effect';
import * as actions from '../actions/user.action';
import { UserService } from '../../../api';
import { user } from '../../../../testing/mock-user';

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

describe('UserEffects', () => {
  let effects: UserEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockUserService;

  beforeEach(() => {
    mockUserService = {
      get: jasmine.createSpy('get').and.returnValue(of(user)),
      me: jasmine.createSpy('me').and.returnValue(of(user)),
      delete: jasmine.createSpy('delete').and.returnValue(of(null))
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        UserEffects,
        { provide: Actions, useFactory: getActions },
        { provide: UserService, useFactory: () => mockUserService }
      ]
    });

    effects = testBed.get(UserEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadCurrentUser$', () => {
    it('should return a userAction.LoadMeSuccess, with user, on success', () => {
      const action = new actions.LoadMe();
      const completion = new actions.LoadMeSuccess(user);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: completion });
      mockUserService.me.and.callFake(() => response);

      expect(effects.loadCurrentUser$).toBeObservable(expected);
    });

    it('should return a userAction.LoadMeFail, with error, on fail', () => {
      const action = new actions.LoadMe();
      const error = { status: 500 };
      const completion = new actions.LoadMeFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockUserService.me.and.callFake(() => response);

      expect(effects.loadCurrentUser$).toBeObservable(expected);
    });
  });

  describe('LoadCurrentUserFail$', () => {
    it('should delete user on load me fail', () => {
      const action = new actions.LoadMeFail(null);
      const error = { status: 500 };
      const completion = action;

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-b', { b: completion });
      mockUserService.me.and.callFake(() => response);

      expect(effects.loadCurrentUserFail$).toBeObservable(expected);
      expect(mockUserService.delete).toHaveBeenCalled();
    });
  });

  describe('loadUser$', () => {
    it('should return a userAction.LoadUserSuccess, with user, on success', () => {
      const action = new actions.LoadUser('foo');
      const completion = new actions.LoadUserSuccess(user);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: user });
      const expected = cold('--b', { b: completion });
      mockUserService.get.and.callFake(() => response);

      expect(effects.loadUser$).toBeObservable(expected);
    });

    it('should return a userAction.LoadUserFail, with error, on fail', () => {
      const action = new actions.LoadUser('foo');
      const error = { status: 500 };
      const completion = new actions.LoadUserFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockUserService.get.and.callFake(() => response);

      expect(effects.loadUser$).toBeObservable(expected);
    });
  });
});

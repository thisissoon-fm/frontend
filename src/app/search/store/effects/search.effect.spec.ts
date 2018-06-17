import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { SearchEffects } from './search.effect';
import * as actions from '../actions/search.action';
import { SpotifySearchService } from '../../../api';
import { search as spotifySearch } from '../../../../testing/mock-spotify-search';
import { initialState } from '../reducers/search.reducer';

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

describe('SearchEffects', () => {
  let effects: SearchEffects;
  let actions$: TestActions;
  let testBed: typeof TestBed;
  let mockSearchService;
  let mockStore;

  beforeEach(() => {
    mockSearchService = {
      search: jasmine.createSpy('search').and.returnValue(of(spotifySearch))
    };

    mockStore = {
      select: jasmine
        .createSpy('select')
        .and.returnValue(of({ ...initialState, query: 'foo' }))
    };

    testBed = TestBed.configureTestingModule({
      providers: [
        SearchEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SpotifySearchService, useFactory: () => mockSearchService },
        { provide: Store, useFactory: () => mockStore }
      ]
    });

    effects = testBed.get(SearchEffects);
    actions$ = testBed.get(Actions);
  });

  describe('loadSearchResults$', () => {
    it('should return a searchAction.LoadSearchResultsSuccess, with search, on success', () => {
      const action = new actions.LoadSearchResults();
      const completion = new actions.LoadSearchResultsSuccess(spotifySearch);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: spotifySearch });
      const expected = cold('--b', { b: completion });
      mockSearchService.search.and.callFake(() => response);

      expect(effects.loadSearchResults$).toBeObservable(expected);
    });

    it('should return a searchAction.LoadSearchResultsFail, with error, on fail', () => {
      const action = new actions.LoadSearchResults();
      const error = { status: 500 };
      const completion = new actions.LoadSearchResultsFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockSearchService.search.and.callFake(() => response);

      expect(effects.loadSearchResults$).toBeObservable(expected);
    });
  });

  describe('loadSearchResultsNextPage$', () => {
    it('should return a searchAction.LoadSearchResultsNextPageSuccess, with search, on success', () => {
      const action = new actions.LoadSearchResultsNextPage();
      const completion = new actions.LoadSearchResultsNextPageSuccess(
        spotifySearch
      );

      actions$.stream = hot('-a', { a: action });
      const response = cold('-a|', { a: spotifySearch });
      const expected = cold('--b', { b: completion });
      mockSearchService.search.and.callFake(() => response);

      expect(effects.loadSearchResultsNextPage$).toBeObservable(expected);
    });

    it('should return a searchAction.LoadSearchResultsNextPageFail, with error, on fail', () => {
      const action = new actions.LoadSearchResultsNextPage();
      const error = { status: 500 };
      const completion = new actions.LoadSearchResultsNextPageFail(error);

      actions$.stream = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });
      mockSearchService.search.and.callFake(() => response);

      expect(effects.loadSearchResultsNextPage$).toBeObservable(expected);
    });
  });
});

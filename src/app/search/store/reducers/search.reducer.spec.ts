import * as searchReducer from './search.reducer';
import * as searchAction from '../actions/search.action';
import { search } from '../../../../testing/mock-spotify-search';

describe('SearchReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = searchReducer.searchReducer(undefined, {} as any);

      expect(result).toEqual(searchReducer.initialState);
    });
  });

  describe('Load', () => {
    it('should set loading to true on load search request', () => {
      const expected = { ...searchReducer.initialState, loading: true };
      const action = new searchAction.LoadSearchResults();
      const result = searchReducer.searchReducer(
        searchReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load search fail', () => {
      const expected = { ...searchReducer.initialState, loading: false };
      const action = new searchAction.LoadSearchResultsFail(null);
      const result = searchReducer.searchReducer(
        { ...searchReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load search results', () => {
      const expected: searchReducer.SearchState = {
        ...searchReducer.initialState,
        loaded: true,
        loading: false,
        results: search.tracks.items,
        type: 'track',
        pagination: { currentPage: 1, totalCount: 14341, totalPages: 718 },
        query: null
      };
      const action = new searchAction.LoadSearchResultsSuccess(search);
      const result = searchReducer.searchReducer(
        { ...searchReducer.initialState, loading: true, type: 'track' },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Load Next page', () => {
    it('should set loading to true on load next page request', () => {
      const expected = { ...searchReducer.initialState, loading: true };
      const action = new searchAction.LoadSearchResultsNextPage();
      const result = searchReducer.searchReducer(
        searchReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should reset loading state on load next page fail', () => {
      const expected = { ...searchReducer.initialState, loading: false };
      const action = new searchAction.LoadSearchResultsNextPageFail(null);
      const result = searchReducer.searchReducer(
        { ...searchReducer.initialState, loading: true },
        action
      );

      expect(result).toEqual(expected);
    });

    it('should load next page of search results', () => {
      const expected: searchReducer.SearchState = {
        loaded: true,
        loading: false,
        results: [...search.tracks.items, ...search.tracks.items],
        type: 'track',
        pagination: { currentPage: 2, totalCount: 14341, totalPages: 718 },
        query: null
      };
      const action = new searchAction.LoadSearchResultsNextPageSuccess(search);
      const result = searchReducer.searchReducer(
        { ...searchReducer.initialState, loading: true, type: 'track', results: search.tracks.items },
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Search Type', () => {
    it('should set search type', () => {
      const expected: searchReducer.SearchState = { ...searchReducer.initialState, type: 'album' };
      const action = new searchAction.SetSearchType('album');
      const result = searchReducer.searchReducer(
        searchReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Search Query', () => {
    it('should set search type', () => {
      const expected = { ...searchReducer.initialState, query: 'foo' };
      const action = new searchAction.SetSearchQuery('foo');
      const result = searchReducer.searchReducer(
        searchReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('should clear search', () => {
      const expected = { ...searchReducer.initialState, query: null };
      const action = new searchAction.ClearSearch();
      const result = searchReducer.searchReducer(
        {...searchReducer.initialState, query: 'foo'},
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    it('should get search', () => {
      const expected = search.tracks.items;
      const result = searchReducer.getResults({...searchReducer.initialState, results: search.tracks.items});
      expect(result).toEqual(expected);
    });

    it('should get search loading', () => {
      const expected = false;
      const result = searchReducer.getSearchResultsLoading(searchReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get search loaded', () => {
      const expected = false;
      const result = searchReducer.getSearchResultsLoaded(searchReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get search query', () => {
      const expected = 'foo';
      const result = searchReducer.getSearchQuery({...searchReducer.initialState, query: 'foo'});
      expect(result).toEqual(expected);
    });

    it('should get search type', () => {
      const expected = 'track';
      const result = searchReducer.getSearchType(searchReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

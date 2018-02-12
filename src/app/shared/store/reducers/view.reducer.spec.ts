import * as viewReducer from './view.reducer';
import * as viewAction from '../actions/view.action';

describe('viewReducer', () => {

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = viewReducer.viewReducer(undefined, {} as any);

      expect(result).toEqual(viewReducer.initialState);
    });
  });

  describe('Router search', () => {
    it('set search router to active', () => {
      const expected = { ...viewReducer.initialState, routerSearchActive: true };
      const action = new viewAction.SetRouterSearchActive(true);
      const result = viewReducer.viewReducer(
        viewReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('set search router to not active', () => {
      const expected = { ...viewReducer.initialState, routerSearchActive: false };
      const action = new viewAction.SetRouterSearchActive(false);
      const result = viewReducer.viewReducer(
        {...viewReducer.initialState, routerSearchActive: true},
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Search page', () => {
    it('set search page active', () => {
      const expected = { ...viewReducer.initialState, searchPageActive: true };
      const action = new viewAction.SetSearchPageActive(true);
      const result = viewReducer.viewReducer(
        viewReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('set search page to not active', () => {
      const expected = { ...viewReducer.initialState, searchPageActive: false };
      const action = new viewAction.SetSearchPageActive(false);
      const result = viewReducer.viewReducer(
        {...viewReducer.initialState, searchPageActive: true},
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Search detail page', () => {
    it('set search detail page active', () => {
      const expected = { ...viewReducer.initialState, searchDetailPageActive: true };
      const action = new viewAction.SetSearchDetailPageActive(true);
      const result = viewReducer.viewReducer(
        viewReducer.initialState,
        action
      );

      expect(result).toEqual(expected);
    });

    it('set search detail page to not active', () => {
      const expected = { ...viewReducer.initialState, searchDetailPageActive: false };
      const action = new viewAction.SetSearchDetailPageActive(false);
      const result = viewReducer.viewReducer(
        {...viewReducer.initialState, searchDetailPageActive: true},
        action
      );

      expect(result).toEqual(expected);
    });
  });

  describe('Get state values', () => {
    it('should get search router active', () => {
      const expected = false;
      const result = viewReducer.getRouterSearchActiveFromState(viewReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get search detail page active', () => {
      const expected = false;
      const result = viewReducer.getSearchDetailPageActiveFromState(viewReducer.initialState);
      expect(result).toEqual(expected);
    });

    it('should get search page active', () => {
      const expected = false;
      const result = viewReducer.getSearchPageActiveFromState(viewReducer.initialState);
      expect(result).toEqual(expected);
    });
  });
});

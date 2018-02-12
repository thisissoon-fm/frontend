import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { withLatestFrom, concatMap, filter } from 'rxjs/operators';

import * as fromSearchActions from '../actions/search.action';
import { SearchState, getSearchState } from '../reducers';
import { SpotifySearchService } from '../../../api';

@Injectable()
export class SearchEffects {

  @Effect()
  public loadSearchResults$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromSearchActions.LOAD_SEARCH_RESULTS),
      withLatestFrom(this.store$.select(getSearchState)),
      concatMap((value: [Action, SearchState]) => {
        const state = value[1];
        return (state.query && state.query.length >= 3) ?
           this.spotifySearchSvc.search(state.query, state.type)
            .map((res) => new fromSearchActions.LoadSearchResultsSuccess(res))
            .catch((err) => of(new fromSearchActions.LoadSearchResultsFail(err))) :

            of(new fromSearchActions.LoadSearchResultsFail(null));
      })
    );

  @Effect()
  public loadSearchResultsNextPage$: Observable<Action> = this.actions$
    .pipe(
      ofType(fromSearchActions.LOAD_SEARCH_RESULTS_NEXT_PAGE),
      withLatestFrom(this.store$.select(getSearchState)),
      filter((value: [Action, SearchState]) => value[1].query && value[1].query.length > 2),
      concatMap((value: [Action, SearchState]) => {
        const state = value[1];
        const params = new HttpParams()
          .set('offset', `${value[1].results.length}`);
        return this.spotifySearchSvc.search(state.query, state.type, params)
          .map((res) => new fromSearchActions.LoadSearchResultsNextPageSuccess(res))
          .catch((err) => of(new fromSearchActions.LoadSearchResultsNextPageFail(err)));
      })
    );

  constructor(
    private actions$: Actions,
    private store$: Store<SearchState>,
    private spotifySearchSvc: SpotifySearchService
  ) { }
}

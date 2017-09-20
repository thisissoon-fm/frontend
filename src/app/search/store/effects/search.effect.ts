import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as fromSearchActions from '../actions/search.action';
import { SearchState, getSearchState } from '../reducers';
import { PlayerSpotifySearchService, PlayerSpotifyArtistService } from '../../../api';

@Injectable()
export class SearchEffects {

  @Effect()
  public loadSearchResults$: Observable<Action> = this.actions$
    .ofType(fromSearchActions.LOAD_SEARCH_RESULTS)
    .withLatestFrom(this.store$.select(getSearchState))
    .switchMap((value: [Action, SearchState]) => {
      const state = value[1];
      return (state.query && state.query.length >= 3) ?
         this.spotifySearchSvc.search(state.query, state.type)
          .map((res) => new fromSearchActions.LoadSearchResultsSuccess(res))
          .catch((err) => Observable.of(new fromSearchActions.LoadSearchResultsFail(err))) :

          Observable.of(new fromSearchActions.LoadSearchResultsFail(null));
    });

  @Effect()
  public loadSearchResultsNextPage$: Observable<Action> = this.actions$
    .ofType(fromSearchActions.LOAD_SEARCH_RESULTS_NEXT_PAGE)
    .withLatestFrom(this.store$.select(getSearchState))
    .filter((value: [Action, SearchState]) => value[1].query && value[1].query.length > 2)
    .switchMap((value: [Action, SearchState]) => {
      const state = value[1];
      const params = new HttpParams()
        .set('offset', `${value[1].results.length}`);
      return this.spotifySearchSvc.search(state.query, state.type, params)
        .map((res) => new fromSearchActions.LoadSearchResultsNextPageSuccess(res))
        .catch((err) => Observable.of(new fromSearchActions.LoadSearchResultsNextPageFail(err)));
    });

  constructor(
    private actions$: Actions,
    private store$: Store<SearchState>,
    private spotifySearchSvc: PlayerSpotifySearchService
  ) { }
}

import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as fromSearchActions from '../actions/search.action';
import { SearchState, PlayerState, getSearchState } from '../reducers';
import { PlayerSpotifySearchService } from '../../api';

@Injectable()
export class SearchEffects {

  @Effect()
  public loadSearchResults$: Observable<Action> = this.actions$
    .ofType(fromSearchActions.LOAD_SEARCH_RESULTS)
    .withLatestFrom(this.store$.select(getSearchState))
    .switchMap((value: [Action, SearchState]) => {
      const state = value[1];
      return this.spotifySearchSvc.search(state.query, state.type)
        .map((res) => {
          const items = res[`${state.type}s`].items;
          return new fromSearchActions.LoadSearchResultsSuccess(items);
        })
        .catch((err) => Observable.of(new fromSearchActions.LoadSearchResultsFail(err)));
    });

  constructor(
    private actions$: Actions,
    private store$: Store<PlayerState>,
    private spotifySearchSvc: PlayerSpotifySearchService
  ) { }
}

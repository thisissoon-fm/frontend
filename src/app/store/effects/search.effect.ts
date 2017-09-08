import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as searchActions from '../actions/search.action';
import { PlayerSpotifySearchService } from '../../api';

@Injectable()
export class SearchEffects {

  @Effect()
  public loadSearchResults$: Observable<Action> = this.actions$
    .ofType(searchActions.LOAD_SEARCH_RESULTS)
    .map((action: searchActions.LoadSearchResults) => action.payload)
    .switchMap((data) => {
      console.log(data);
      return this.spotifySearchSvc.search(data.query, data.type)
        .map((res) => {
          console.log(res.tracks.items);
          return new searchActions.LoadSearchResultsSuccess(res.tracks.items);
        })
        .catch((err) => Observable.of(new searchActions.LoadSearchResultsFail(err)));
    });


  constructor(
    private actions$: Actions,
    private spotifySearchSvc: PlayerSpotifySearchService
  ) { }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as fromSearchStore from '../store';
import * as fromPlayerStore from '../../player/store';
import { SearchType, SpotifySearch } from '../../api';
import { fadeMoveUpAnimation } from '../../shared/animations';


@Component({
  selector: 'sfm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeMoveUpAnimation]
})
export class SearchComponent implements OnInit, OnDestroy {
  /**
   * Observable that emits and event when search input is changed
   *
   * @type {Subject<string>}
   * @memberof SearchComponent
   */
  public onSearchChange$: Subject<string> = new Subject<string>();
  /**
   * Search state
   *
   * @type {fromSearchStore.SearchState}
   * @memberof SearchComponent
   */
  public search: fromSearchStore.SearchState;
  /**
   * List of search results
   *
   * @type {any[]}
   * @memberof SearchComponent
   */
  public results: any[] = [];
  /**
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof SearchComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
  /**
   * Returns true if all results have been loaded
   *
   * @readonly
   * @type {boolean}
   * @memberof SearchComponent
   */
  public get allResultsLoaded(): boolean {
    return this.search.pagination.currentPage >= this.search.pagination.totalPages;
  }
  /**
   * Creates an instance of SearchComponent.
   * @param {Store<fromSearchStore.SearchState>} searchStore$
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @memberof SearchComponent
   */
  constructor(
    private searchStore$: Store<fromSearchStore.SearchState>,
    private playerStore$: Store<fromPlayerStore.PlayerState>
  ) { }
  /**
   * Subscribe to search
   *
   * @memberof SearchComponent
   */
  public ngOnInit(): void {
    this.onSearchChange$
      .takeUntil(this.ngUnsubscribe$)
      .debounceTime(100)
      .subscribe((query) => this.setSearchQuery(query));

    this.searchStore$.select(fromSearchStore.getSearchState)
      .subscribe((search) => this.search = search);

    this.searchStore$.select(fromSearchStore.getSearchResults)
      .subscribe((results) => this.results = results);
  }
  /**
   * Event handler for search input change, send next value
   * to `onSearchChange$` observable
   *
   * @param {Event} event
   * @memberof SearchComponent
   */
  public onSearchInputChange(event: Event): void {
    const query = (<HTMLInputElement>event.target).value;
    this.onSearchChange$.next(query);
  }
  /**
   * Set search query
   *
   * @param {string} query
   * @memberof SearchComponent
   */
  public loadSearchResults(): void {
    this.searchStore$.dispatch(new fromSearchStore.LoadSearchResults());
  }
  /**
   * Set search type
   *
   * @param {string} query
   * @memberof SearchComponent
   */
  public setSearchQuery(query: string): void {
    this.searchStore$.dispatch(new fromSearchStore.SetSearchQuery(query));
    this.loadSearchResults();
  }
  /**
   * Set search type
   *
   * @param {string} query
   * @param {SearchType} search
   * @memberof SearchComponent
   */
  public setSearchType(type: SearchType): void {
    this.searchStore$.dispatch(new fromSearchStore.SetSearchType(type));
    this.loadSearchResults();
  }
  /**
   * Add to queue
   *
   * @param {string} uri
   * @memberof SearchComponent
   */
  public addToQueue(uri: string): void {
    this.playerStore$.dispatch(new fromPlayerStore.QueueAdd(uri));
  }
  /**
   * Close search
   *
   * @memberof SearchComponent
   */
  public close(): void {
    this.searchStore$.dispatch(new fromSearchStore.ClearSearch());
  }
  /**
   * On scroll end load more tracks if needed
   *
   * @memberof SearchComponent
   */
  public onScrollEnd(): void {
    this.searchStore$.dispatch(new fromSearchStore.LoadSearchResultsNextPage());
  }
  /**
   * Unsubscribe from infinite observable on destroy
   *
   * @memberof SearchComponent
   */
  public ngOnDestroy(): void {
    this.ngUnsubscribe$.complete();
    this.ngUnsubscribe$.unsubscribe();
  }
}

import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, filter } from 'rxjs/operators';

import * as fromSearchStore from '../store';
import * as fromSharedStore from '../../shared/store';
import * as fromPlayerStore from '../../player/store';
import { SearchType } from '../../api';
import {
  fadeMoveUpAnimation,
  swipeLeftFadeAnimation
} from '../../shared/animations';

@Component({
  selector: 'sfm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [fadeMoveUpAnimation, swipeLeftFadeAnimation]
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
   * True if search page is active
   *
   * @type {boolean}
   * @memberof SearchComponent
   */
  public isSearchPage: boolean;
  /**
   * True if search router is active
   *
   * @type {boolean}
   * @memberof SearchComponent
   */
  public isSearchRouterActive: boolean;
  /**
   * List of search results
   *
   * @type {any[]}
   * @memberof SearchComponent
   */
  public results: any[] = [];
  /**
   * Reference to search input element
   *
   * @type {ElementRef}
   * @memberof SearchComponent
   */
  @ViewChild('inputSearch') public inputSearch: ElementRef;
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
    return (
      this.search.pagination.currentPage >= this.search.pagination.totalPages
    );
  }
  /**
   * Creates an instance of SearchComponent.
   * @param {Store<fromSearchStore.SearchState>} searchStore$
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @memberof SearchComponent
   */
  constructor(
    private searchStore$: Store<fromSearchStore.SearchState>,
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private sharedStore$: Store<fromSharedStore.SharedState>,
    private router: Router
  ) {}
  /**
   * Subscribe to search
   *
   * @memberof SearchComponent
   */
  public ngOnInit(): void {
    this.onSearchChange$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        debounceTime(300)
      )
      .subscribe(query => this.setSearchQuery(query));

    this.searchStore$
      .select(fromSearchStore.getSearchState)
      .subscribe(search => {
        this.search = search;
        this.results = search.results;
      });

    this.sharedStore$
      .select(fromSharedStore.getSearchPageActive)
      .subscribe(isSearchPage => (this.isSearchPage = isSearchPage));

    this.sharedStore$
      .select(fromSharedStore.getRouterSearchActive)
      .subscribe(
        isSearchRouterActive =>
          (this.isSearchRouterActive = isSearchRouterActive)
      );

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
        filter((event: NavigationStart) =>
          event.url.includes('(search:search)')
        )
      )
      .subscribe(() => this.inputSearch.nativeElement.focus());
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
   * Load search results
   *
   * @memberof SearchComponent
   */
  public loadSearchResults(): void {
    this.searchStore$.dispatch(new fromSearchStore.LoadSearchResults());
  }
  /**
   * Set search query
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
   * @param {SearchType} type
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
    this.inputSearch.nativeElement.value = '';
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

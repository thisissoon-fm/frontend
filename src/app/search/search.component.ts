import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as fromStore from '../store';
import { SearchType } from '../api';

@Component({
  selector: 'sfm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  /**
   * Observable that emits and event when search input is changed
   *
   * @type {Subject<string>}
   * @memberof SearchComponent
   */
  public onSearchChange$: Subject<string> = new Subject<string>();
  /**
   * Observable used to unsubscribe and complete infinite observables
   * on component destroy lifecycle hook
   *
   * @type {Subject<void>}
   * @memberof SearchComponent
   */
  public ngUnsubscribe$: Subject<void> = new Subject<void>();
  /**
   * Observable of search status
   *
   * @type {Observable<fromStore.SearchState>}
   * @memberof SearchComponent
   */
  public search$: Observable<fromStore.SearchState>;
  /**
   * Creates an instance of SearchComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @memberof SearchComponent
   */
  constructor(private store: Store<fromStore.PlayerState>) { }
  /**
   * Subscribe to search
   *
   * @memberof SearchComponent
   */
  public ngOnInit(): void {
    this.onSearchChange$
      .takeUntil(this.ngUnsubscribe$)
      .filter((query) => query.length > 2)
      .debounceTime(100)
      .subscribe((query) => this.setSearch(query, 'track'));

    this.search$ = this.store.select(fromStore.getSearchState);
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
   * @param {SearchType} search
   * @memberof SearchComponent
   */
  public setSearch(query: string, type: SearchType): void {
    this.store.dispatch(new fromStore.LoadSearchResults({ query, type }));
  }
  /**
   * Add to queue
   *
   * @param {string} uri
   * @memberof SearchComponent
   */
  public addToQueue(uri: string): void {
    this.store.dispatch(new fromStore.QueueAdd(uri));
  }
  /**
   * Close search
   *
   * @memberof SearchComponent
   */
  public close(): void {
    this.store.dispatch(new fromStore.SetDefaultView());
  }
}

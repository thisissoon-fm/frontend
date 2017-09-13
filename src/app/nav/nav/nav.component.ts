import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromSharedStore from '../../shared/store';
import { CenterView } from '../../shared';

@Component({
  selector: 'sfm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  /**
   * Store `CenterView` enum as a property in the component
   * to use in template
   *
   * @memberof NavComponent
   */
  public centerView = CenterView;
  /**
   * Current view state
   *
   * @type {Observable<fromSharedStore.ViewState>}
   * @memberof NavComponent
   */
  public view$: Observable<fromSharedStore.ViewState>;
  /**
   * Creates an instance of NavComponent.
   * @param {Store<fromSharedStore.PlayerState>} sharedStore$
   * @memberof NavComponent
   */
  constructor(private sharedStore$: Store<fromSharedStore.SharedState>) { }
  /**
   * Get view state from store
   *
   * @memberof NavComponent
   */
  public ngOnInit(): void {
    this.view$ = this.sharedStore$.select(fromSharedStore.getViewState);
  }
  /**
   * close right section
   *
   * @param {Event} event
   * @memberof NavComponent
   */
  public closeRightView(event: Event): void {
    this.sharedStore$.dispatch(new fromSharedStore.SetRightViewOpen(false));
  }
  /**
   * Set sidebar view
   *
   * @param {View} view
   * @memberof NavComponent
   */
  public setView(centerView: CenterView): void {
    this.sharedStore$.dispatch(new fromSharedStore.SetCenterView(centerView));
  }
}

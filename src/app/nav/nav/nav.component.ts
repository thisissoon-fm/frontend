import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromStore from '../../store';
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
   * @type {Observable<fromStore.ViewState>}
   * @memberof NavComponent
   */
  public view$: Observable<fromStore.ViewState>;
  /**
   * Creates an instance of NavComponent.
   * @param {Store<fromStore.PlayerState>} store$
   * @memberof NavComponent
   */
  constructor(private store$: Store<fromStore.PlayerState>) { }
  /**
   * Get view state from store
   *
   * @memberof NavComponent
   */
  public ngOnInit(): void {
    this.view$ = this.store$.select(fromStore.getViewState);
  }
  /**
   * close right section
   *
   * @param {Event} event
   * @memberof NavComponent
   */
  public closeRightView(event: Event): void {
    this.store$.dispatch(new fromStore.SetRightViewOpen(false));
  }
  /**
   * Set sidebar view
   *
   * @param {View} view
   * @memberof NavComponent
   */
  public setView(centerView: CenterView): void {
    this.store$.dispatch(new fromStore.SetCenterView(centerView));
  }
}

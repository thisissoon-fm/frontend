import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { View } from '../../shared';

@Component({
  selector: 'sfm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {
  /**
   * Store `View` enum as a property in the component
   * to use in template
   *
   * @memberof NavComponent
   */
  public view = View;
  /**
   * Creates an instance of NavComponent.
   * @param {Store<fromStore.PlayerState>} store
   * @memberof NavComponent
   */
  constructor(private store: Store<fromStore.PlayerState>) { }
  /**
   * Set sidebar view
   *
   * @param {View} view
   * @memberof NavComponent
   */
  public setView(view: View): void {
    this.store.dispatch(new fromStore.SetView(view));
  }
}

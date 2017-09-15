import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromUserStore from '../user';

@Component({
  selector: 'sfm-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  /**
   * Observable of the currently logged in user state
   *
   * @type {Observable<fromUserStore.UserState>}
   * @memberof NavComponent
   */
  public user$: Observable<fromUserStore.UserState>;
  /**
   * Creates an instance of NavComponent.
   * @param {Store<fromUserStore.UserState>} userStore$
   * @memberof NavComponent
   */
  constructor(private userStore$: Store<fromUserStore.UserState>) { }
  /**
   * Subscribe to user state and store as a property in Observable
   *
   * @memberof NavComponent
   */
  public ngOnInit(): void {
    this.user$ = this.userStore$.select(fromUserStore.getUserState);
  }
}

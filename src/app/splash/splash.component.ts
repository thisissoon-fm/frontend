import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { OAuthService } from '../auth';
import * as fromUserStore from '../user/store';
import * as fromPlayerStore from '../player/store';
import { fadeAnimation } from '../shared';

@Component({
  selector: 'sfm-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  animations: [ fadeAnimation ]
})
export class SplashComponent implements OnInit {
  /**
   * Store logged in user state as component property
   *
   * @type {boolean}
   * @memberof SplashComponent
   */
  public isAuthenticated = false;
  /**
   * Returns true if all player data has been loaded
   *
   * @type {Observable<boolean>}
   * @memberof SplashComponent
   */
  public playerDataLoaded = false;
  /**
   * Creates an instance of SplashComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @param {Store<fromUserStore.UserState>} userStore$
   * @param {Router} router
   * @memberof SplashComponent
   */
  constructor(
    private playerStore$: Store<fromPlayerStore.PlayerState>,
    private userStore$: Store<fromUserStore.UserState>,
    private router: Router,
    private oauthSvc: OAuthService
  ) { }
  /**
   * Load data for component from store
   *
   * @memberof SplashComponent
   */
  public ngOnInit(): void {
    const authenticated$ = this.userStore$.select(fromUserStore.getUserAuthenticated);
    const dataLoaded$ = this.playerStore$.select(fromPlayerStore.getLoadedState);

    dataLoaded$.combineLatest(authenticated$)
      .subscribe((data) =>  {
        this.playerDataLoaded = data[0];
        this.isAuthenticated = data[1];
        if (this.playerDataLoaded && this.isAuthenticated) {
          this.router.navigate(['/home']);
        }
      });
  }
  /**
   * Request OAuth authentication and navigate to homepage
   * if successful
   *
   * @memberof SplashComponent
   */
  public login(): void {
    this.oauthSvc
      .authenticate('google')
      .subscribe(() => {
        this.userStore$.dispatch(new fromUserStore.LoadMe());
        this.userStore$.select(fromUserStore.getUser)
          .filter(user => !!(user && user.id))
          .subscribe(user => this.router.navigate(['/home']));
      });
  }
}

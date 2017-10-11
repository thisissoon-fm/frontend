import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../../player/store';

@Component({
  selector: 'sfm-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  /**
   * Stats data for the current week
   *
   * @type {Observable<any>}
   * @memberof StatsComponent
   */
  public stats$: Observable<any>;
  /**
   * Creates an instance of StatsComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @memberof StatsComponent
   */
  constructor(public playerStore$: Store<fromPlayerStore.PlayerState>) { }
  /**
   * Get stats data from store and attact it component property
   *
   * @memberof StatsComponent
   */
  public ngOnInit(): void {
    this.stats$ = this.playerStore$.select(fromPlayerStore.getStats);
  }
}

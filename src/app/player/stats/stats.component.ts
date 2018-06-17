import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromPlayerStore from '../../player/store';
import { fadeMoveUpAnimation } from '../../shared/animations';

@Component({
  selector: 'sfm-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  animations: [fadeMoveUpAnimation]
})
export class StatsComponent implements OnInit {
  /**
   * Stats data for the current week
   *
   * @type {Observable<any>}
   * @memberof StatsComponent
   */
  public stats: any;
  /**
   * Creates an instance of StatsComponent.
   * @param {Store<fromPlayerStore.PlayerState>} playerStore$
   * @memberof StatsComponent
   */
  constructor(public playerStore$: Store<fromPlayerStore.PlayerState>) {}
  /**
   * Get stats data from store and attact it to component property
   *
   * @memberof StatsComponent
   */
  public ngOnInit(): void {
    this.playerStore$
      .select(fromPlayerStore.getStats)
      .pipe(delay(0))
      .subscribe(stats => (this.stats = stats));
  }
}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { NotificationModule } from '../notification';
import { ApiModule } from '../api';

import { NowPlayingComponent } from './now-playing';
import { QueueComponent } from './queue';
import { QueueItemComponent } from './queue-item';
import { StatsComponent } from './stats';
import { effects, reducers } from './store';
import { EqualizerComponent } from './equalizer';

const components: any[] = [
  NowPlayingComponent,
  QueueComponent,
  QueueItemComponent,
  StatsComponent,
  EqualizerComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('player', reducers),
    EffectsModule.forFeature(effects),
    NgbPopoverModule,
    InfiniteScrollModule,
    SharedModule,
    EventModule,
    ApiModule,
    NotificationModule
  ],
  exports: [
    ...components
  ],
  declarations: [
    ...components,
  ]
})
export class PlayerModule { }

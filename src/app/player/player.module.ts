import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from '@thisissoon/angular-infinite-scroll';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { NotificationModule } from '../notification';
import { ApiModule } from '../api';

import { NowPlayingComponent } from './now-playing';
import { QueueComponent } from './queue';
import { QueueItemComponent } from './queue-item';
import { StatsComponent } from './stats';
import { effects, reducers } from './store';

const components: any[] = [
  NowPlayingComponent,
  QueueComponent,
  QueueItemComponent,
  StatsComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature('player', reducers),
    EffectsModule.forFeature(effects),
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
    ...components
  ]
})
export class PlayerModule { }

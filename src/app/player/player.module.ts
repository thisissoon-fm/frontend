import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { NowPlayingComponent } from './now-playing';
import { QueueComponent } from './queue';
import { QueueItemComponent } from './queue-item';
import { StatsComponent } from './stats';
import { ApiModule } from '../api';

import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventModule,
    StoreModule.forFeature('player', reducers),
    EffectsModule.forFeature(effects),
    ApiModule
  ],
  declarations: [
    NowPlayingComponent,
    QueueComponent,
    QueueItemComponent,
    StatsComponent
  ],
  exports: [
    NowPlayingComponent,
    QueueComponent,
    QueueItemComponent,
    StatsComponent
  ]
})
export class PlayerModule { }

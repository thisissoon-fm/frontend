import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    StoreModule.forFeature('player', reducers),
    EffectsModule.forFeature(effects),
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

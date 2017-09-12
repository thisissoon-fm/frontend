import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { NowPlayingComponent } from './now-playing';
import { QueueComponent } from './queue';
import { QueueItemComponent } from './queue-item';
import { StatsComponent } from './stats';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventModule
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

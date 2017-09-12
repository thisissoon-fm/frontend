import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { QueueItemComponent } from './queue-item';
import { NowPlayingComponent } from './now-playing';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventModule
  ],
  declarations: [
    QueueItemComponent,
    NowPlayingComponent,
    StatsComponent
  ],
  exports: [
    QueueItemComponent,
    NowPlayingComponent,
    StatsComponent
  ]
})
export class PlayerModule { }

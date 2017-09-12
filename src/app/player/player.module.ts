import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventModule } from '../event';
import { SharedModule } from '../shared';
import { QueueItemComponent } from './queue-item';
import { NowPlayingComponent } from './now-playing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EventModule
  ],
  declarations: [
    QueueItemComponent,
    NowPlayingComponent
  ],
  exports: [
    QueueItemComponent,
    NowPlayingComponent
  ]
})
export class PlayerModule { }

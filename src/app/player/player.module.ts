import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { QueueItemComponent } from './queue-item';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    QueueItemComponent
  ],
  exports: [
    QueueItemComponent
  ]
})
export class PlayerModule { }

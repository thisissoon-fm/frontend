import { Component, OnInit } from '@angular/core';
import {
  PlayerQueueService, PlayerCurrentService, PlayerMuteService,
  PlayerVolumeService, QueueItem, Mute, Volume, Meta
} from './api';

@Component({
  selector: 'fm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  current: QueueItem;
  queue: QueueItem[] = [];
  volume: Volume;
  mute: Mute;
  meta: Meta;

  constructor(
    public playerQueueSvc: PlayerQueueService,
    public playerCurrentSvc: PlayerCurrentService,
    public playerVolumeSvc: PlayerVolumeService,
    public playerMuteSvc: PlayerMuteService
  ) { }

  ngOnInit() {
    this.playerQueueSvc.query()
      .subscribe(
        (queue) => this.queue = queue,
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerCurrentSvc.get()
      .subscribe(
        (current) => this.current = current,
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerMuteSvc.get()
      .subscribe(
        (mute) => this.mute = mute,
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerVolumeSvc.get()
      .subscribe(
        (volume) => this.volume = volume,
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerQueueSvc.getMeta()
      .subscribe(
        (meta) => this.meta = meta,
        (err) => console.error(err) /** TODO: Some error handling here **/
      );
  }
}

import { Component, OnInit } from '@angular/core';
import {
  PlayerQueueService, PlayerCurrentService, PlayerMuteService,
  PlayerVolumeService, QueueItem, Mute, Volume
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

  constructor(
    public playerQueueSvc: PlayerQueueService,
    public playerCurrentSvc: PlayerCurrentService,
    public playerVolumeSvc: PlayerVolumeService,
    public playerMuteSvc: PlayerMuteService
  ) { }

  ngOnInit() {
    this.playerQueueSvc.query()
      .subscribe(
        (queue) => { this.queue = queue; console.log(queue); },
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerCurrentSvc.get()
      .subscribe(
        (current) => { this.current = current; console.log(current); },
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerMuteSvc.get()
      .subscribe(
        (mute) => { this.mute = mute; console.log(mute); },
        (err) => console.error(err) /** TODO: Some error handling here **/
      );

    this.playerVolumeSvc.get()
      .subscribe(
        (volume) => { this.volume = volume; console.log(volume); },
        (err) => console.error(err) /** TODO: Some error handling here **/
      );
  }
}

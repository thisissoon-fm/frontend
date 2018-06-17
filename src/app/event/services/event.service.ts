import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {
  SocketIOService,
  SocketIOInstance,
  PlayerEvent,
  events
} from '../shared';
import { environment } from '../../../environments/environment';

/**
 * Service to connect to fm socket.io event service and turns
 * events into a Observable object that can be subscribed to
 *
 * @export
 * @class EventService
 */
@Injectable()
export class EventService {
  /**
   * Observable that emits events from the fm event service
   *
   * @type {Subject<PlayerEvent>}
   * @memberof EventService
   */
  public messages$: Subject<PlayerEvent> = new Subject<PlayerEvent>();
  /**
   * Instance of connected socket.io object
   *
   * @type {SocketIOInstance}
   * @memberof EventService
   */
  public socket: SocketIOInstance;
  /**
   * Creates an instance of EventService.
   * @param {SocketIOService} socketio
   * @memberof EventService
   */
  constructor(socketio: SocketIOService) {
    this.socket = socketio.connect(environment.playerSocketUrl);
    this.socket.on('connect', this.onConnect.bind(this));
  }
  /**
   * Loop through event list and add event handler that emits
   * next value in `messages$` observable
   *
   * @memberof EventService
   */
  public onConnect(): void {
    events.forEach(event =>
      this.socket.on(event, msg => this.messages$.next(msg))
    );
  }
}

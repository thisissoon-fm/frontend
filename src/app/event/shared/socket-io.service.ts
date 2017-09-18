import { Injectable } from '@angular/core';

import { SocketIOInstance } from './socket-io.model';
import { PlayerEvent } from './player-event.model';

/**
 * Reference to socket-io library, can be replaced with
 * any appropriate websocket service depending on the platform
 *
 * @export
 * @class SocketIOService
 */
@Injectable()
export class SocketIOService {
  /**
   * Make connection to socket-io server
   *
   * @param {string} url
   * @returns {SocketIOInstance}
   * @memberof SocketIOService
   */
  public connect(url: string): SocketIOInstance {

    const instance: SocketIOInstance = {
      /**
       * On message calls callback function with message
       */
      on: (msg: string, callback: (msg: PlayerEvent) => any) => { return; },
      /**
       * Disconnect from socket-io server
       */
      disconnect: () => { return; }
    };

    return instance;
  }
}

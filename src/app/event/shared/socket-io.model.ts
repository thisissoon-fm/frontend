import { PlayerEvent } from './player-event.model';

export interface ISocketIO {
  connect(url: string): SocketIOInstance;
}

export interface SocketIOInstance {
  on(msg: string, callback: (msg: PlayerEvent) => any): void;
  disconnect(): void;
}

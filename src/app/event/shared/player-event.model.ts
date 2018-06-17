export interface PlayerEvent {
  event: PlayerEventType;
  uri?: string;
  user?: string;
  uuid?: string;
  mute?: boolean;
  volume?: number;
  id?: string;
}

export type PlayerEventType =
  | 'add'
  | 'end'
  | 'stop'
  | 'pause'
  | 'resume'
  | 'play'
  | 'deleted'
  | 'set_volume'
  | 'set_mute';

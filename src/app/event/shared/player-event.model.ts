export interface PlayerEvent {
  event: string;
  uri?: string;
  user?: string;
  uuid?: string;
  mute?: boolean;
  volume?: number;
}

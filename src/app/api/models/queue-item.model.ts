import { Track } from './track.model';
import { User } from './user.model';
import { Player } from './player.model';

export interface QueueItem {
  track: Track;
  user: User;
  uuid?: string;
  paused?: boolean;
  player?: Player;
}

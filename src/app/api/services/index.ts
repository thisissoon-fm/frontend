import { PlayerQueueService } from './player-queue.service';
import { PlayerCurrentService } from './player-current.service';
import { PlayerVolumeService } from './player-volume.service';
import { PlayerMuteService  } from './player-mute.service';
import { PlayerPauseService } from './player-pause.service';
import { UserService } from './user.service';
import { TrackService } from './track.service';
import { PlayerSpotifySearchService } from './player-spotify-search.service';
import { PlayerSpotifyArtistService } from './player-spotify-artist.service';

export const apiProviders = [
  PlayerQueueService,
  PlayerCurrentService,
  PlayerVolumeService,
  PlayerMuteService,
  PlayerPauseService,
  UserService,
  TrackService,
  PlayerSpotifySearchService,
  PlayerSpotifyArtistService
];

export * from './player-queue.service';
export * from './player-current.service';
export * from './player-volume.service';
export * from './player-mute.service';
export * from './player-pause.service';
export * from './user.service';
export * from './track.service';
export * from './player-spotify-search.service';
export * from './player-spotify-artist.service';


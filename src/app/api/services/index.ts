import { QueueService } from './queue.service';
import { CurrentService } from './current.service';
import { VolumeService } from './volume.service';
import { MuteService  } from './mute.service';
import { PauseService } from './pause.service';
import { UserService } from './user.service';
import { TrackService } from './track.service';
import { StatsService } from './stats.service';
import { SpotifySearchService } from './spotify-search.service';
import { SpotifyArtistService } from './spotify-artist.service';
import { SpotifyAlbumService } from './spotify-album.service';

export const apiProviders = [
  QueueService,
  CurrentService,
  VolumeService,
  MuteService,
  PauseService,
  UserService,
  TrackService,
  StatsService,
  SpotifySearchService,
  SpotifyArtistService,
  SpotifyAlbumService
];

export * from './queue.service';
export * from './current.service';
export * from './volume.service';
export * from './mute.service';
export * from './pause.service';
export * from './user.service';
export * from './track.service';
export * from './stats.service';
export * from './spotify-search.service';
export * from './spotify-artist.service';
export * from './spotify-album.service';


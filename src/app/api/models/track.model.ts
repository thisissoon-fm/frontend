import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Track {
  album: Album;
  name: string;
  uri: string;
  play_count: number;
  artists: Artist[];
  artistsAsString?: string;
  duration: number;
  id: string;
}

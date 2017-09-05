import { Album } from './album.model';

export interface User {
  family_name: string;
  display_name: string;
  avatar_url: string;
  spotify_playlists: Album[];
  given_name: string;
  id: string;
}

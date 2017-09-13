import { Image } from './image.model';

export interface SpotifySearch {
  albums?: SpotifyAlbums;
  tracks?: SpotifyTracks;
  artists?: SpotifyArtists;
}

export interface SpotifyArtists {
  items: SpotifyArtist[];
  next: string;
  href: string;
  limit: number;
  offset: number;
  total: number;
  previous?: any;
}

export interface SpotifyArtist {
  genres: string[];
  name: string;
  external_urls: ExternalUrls;
  popularity: number;
  uri: string;
  href: string;
  followers: Followers;
  images: Image[];
  type: string;
  id: string;
}

export interface Followers {
  total: number;
  href?: any;
}

export interface SpotifyTracks {
  items: SpotifyTrack[];
  next: string;
  href: string;
  limit: number;
  offset: number;
  total: number;
  previous?: any;
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  name: string;
  uri: string;
  external_urls: ExternalUrls;
  popularity: number;
  explicit: boolean;
  preview_url?: string;
  track_number: number;
  disc_number: number;
  href: string;
  artists: SpotifyArtist[];
  duration_ms: number;
  external_ids: ExternalIds;
  type: string;
  id: string;
  available_markets: string[];
}

export interface ExternalIds {
  isrc: string;
}

export interface SpotifyAlbums {
  items: SpotifyAlbum[];
  next: string;
  href: string;
  limit: number;
  offset: number;
  total: number;
  previous?: any;
}

export interface SpotifyAlbum {
  album_type: string;
  name: string;
  external_urls: ExternalUrls;
  uri: string;
  href: string;
  artists: SpotifyArtist[];
  images: Image[];
  type: string;
  id: string;
  available_markets: string[];
}

export interface SpotifyArtist {
  name: string;
  external_urls: ExternalUrls;
  uri: string;
  href: string;
  type: string;
  id: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ArtistDetail {
  artist: SpotifyArtist;
  topTracks: SpotifySearch;
  albums: SpotifyAlbums;
  singles: SpotifyAlbums;
  related: SpotifySearch;
}

export interface AlbumDetail {
  album: SpotifyAlbum;
  tracks: SpotifyTracks;
}

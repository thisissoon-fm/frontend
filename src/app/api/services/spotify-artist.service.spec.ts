import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { SpotifyArtistService } from './spotify-artist.service';
import { environment } from '../../../environments/environment';

import {
  artist,
  albums,
  topTracks,
  relatedArtists
} from '../../../testing/mock-spotify-artist';

describe('SpotifyArtistService', () => {
  let spotifyArtistService: SpotifyArtistService;
  let httpMock: HttpTestingController;
  let testBed: typeof TestBed;

  beforeEach(() => {
    testBed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyArtistService]
    });

    spotifyArtistService = testBed.get(SpotifyArtistService);
    httpMock = testBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get spotify artist', () => {
    spotifyArtistService.get('foo').subscribe(res => {
      expect(res).toEqual(artist);
    });

    const artistRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}spotify/artists/foo`
    );

    artistRequest.flush(artist);
  });

  it('should send request to get artist albums', () => {
    spotifyArtistService.getAlbums('foo').subscribe(res => {
      expect(res.items[0].name).toEqual('Signs');
    });

    const artistRequest = httpMock.expectOne(
      `${
        environment.apiUrlPlayer
      }spotify/artists/foo/albums?album_type=album&market=GB&limit=20`
    );

    artistRequest.flush(albums);
  });

  it('should send request to get artist singles', () => {
    spotifyArtistService.getSingles('foo').subscribe(res => {
      expect(res.items[0].name).toEqual('Signs');
    });

    const artistRequest = httpMock.expectOne(
      `${
        environment.apiUrlPlayer
      }spotify/artists/foo/albums?album_type=single&market=GB&limit=20`
    );

    artistRequest.flush(albums);
  });

  it('should send request to get artist top tracks', () => {
    spotifyArtistService.getTopTracks('foo').subscribe(res => {
      expect(res.tracks.items[0].name).toEqual('One Dance');
    });

    const artistRequest = httpMock.expectOne(
      `${
        environment.apiUrlPlayer
      }spotify/artists/foo/top-tracks?country=GB&limit=20`
    );

    artistRequest.flush(topTracks);
  });

  it('should send request to get related artists', () => {
    spotifyArtistService.getRelatedArtists('foo').subscribe(res => {
      expect(res.artists.items[0].name).toEqual('Pusha T');
    });

    const artistRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}spotify/artists/foo/related-artists`
    );

    artistRequest.flush(relatedArtists);
  });
});

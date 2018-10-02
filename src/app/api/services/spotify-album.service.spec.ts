import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { SpotifyAlbumService } from './spotify-album.service';
import { environment } from '../../../environments/environment';

import { album, tracks } from '../../../testing/mock-spotify-album';

describe('SpotifyAlbumService', () => {
  let spotifyAlbumService: SpotifyAlbumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpotifyAlbumService]
    });

    spotifyAlbumService = TestBed.get(SpotifyAlbumService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get spotify album', () => {
    spotifyAlbumService.get('foo').subscribe(res => {
      expect(res.name).toEqual('More Life');
    });

    const albumRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}spotify/albums/foo`
    );
    albumRequest.flush(album);
  });

  it('should send request to get album tracks', () => {
    spotifyAlbumService.getTracks('foo').subscribe(res => {
      expect(res.items[0].name).toEqual('Free Smoke');
    });

    const albumRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}spotify/albums/foo/tracks?limit=20`
    );
    albumRequest.flush(tracks);
  });
});

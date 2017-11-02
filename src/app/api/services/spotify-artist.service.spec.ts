import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpotifyArtistService } from './spotify-artist.service';
import { environment } from '../../../environments/environment';

import { artist, albums, topTracks, relatedArtists } from '../../../testing/mock-spotify-artist';
import { search } from '../../../testing/mock-spotify-search';

describe('SpotifyArtistService', () => {
  let spotifyArtistService: SpotifyArtistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SpotifyArtistService ]
    });

    spotifyArtistService = TestBed.get(SpotifyArtistService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get spotify artist', (done) => {
    spotifyArtistService.get('foo')
      .subscribe((res) => {
        expect(res).toEqual(artist);
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/artists/foo`);
    artistRequest.flush(artist);
    httpMock.verify();
  });

  it('should send request to get artist albums', (done) => {
    spotifyArtistService.getAlbums('foo')
      .subscribe((res) => {
        expect(res.items[0].name).toEqual('Signs');
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/artists/foo/albums?album_type=album&market=GB&limit=20`);
    artistRequest.flush(albums);
    httpMock.verify();
  });

  it('should send request to get artist singles', (done) => {
    spotifyArtistService.getSingles('foo')
      .subscribe((res) => {
        expect(res.items[0].name).toEqual('Signs');
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/artists/foo/albums?album_type=single&market=GB&limit=20`);
    artistRequest.flush(albums);
    httpMock.verify();
  });

  it('should send request to get artist top tracks', (done) => {
    spotifyArtistService.getTopTracks('foo')
      .subscribe((res) => {
        expect(res.tracks.items[0].name).toEqual('One Dance');
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/artists/foo/top-tracks?country=GB&limit=20`);
    artistRequest.flush(topTracks);
    httpMock.verify();
  });

  it('should send request to get related artists', (done) => {
  spotifyArtistService.getRelatedArtists('foo')
      .subscribe((res) => {
        expect(res.artists.items[0].name).toEqual('Pusha T');
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/artists/foo/related-artists`);
    artistRequest.flush(relatedArtists);
    httpMock.verify();
  });

});

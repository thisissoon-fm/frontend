import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SpotifySearchService } from './spotify-search.service';
import { environment } from '../../../environments/environment';

import { search } from '../../../testing/mock-spotify-search';

describe('SpotifySearchService', () => {
  let spotifySearchService: SpotifySearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SpotifySearchService ]
    });

    spotifySearchService = TestBed.get(SpotifySearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get spotify artist', (done) => {
    spotifySearchService.search('foo')
      .subscribe((res) => {
        expect(res.tracks.items[0].name).toEqual('Signs');
        done();
      });

    const artistRequest = httpMock.expectOne(`${environment.apiUrlPlayer}spotify/search?q=foo*&type=track&market=GB`);
    artistRequest.flush(search);
    httpMock.verify();
  });
});

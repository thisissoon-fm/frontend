import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { TrackService } from './track.service';
import { environment } from '../../../environments/environment';
import { queueItem } from '../../../testing/mock-queue-item';

describe('TrackService', () => {
  let trackService: TrackService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TrackService]
    });

    trackService = TestBed.get(TrackService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get track data', done => {
    trackService.get('foo').subscribe(res => {
      expect(res.name).toEqual("Shakin' All Over");
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}tracks/foo`
    );
    statsRequest.flush(queueItem.track);
    httpMock.verify();
  });
});

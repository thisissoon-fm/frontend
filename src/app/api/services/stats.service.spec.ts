import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { StatsService } from './stats.service';
import { environment } from '../../../environments/environment';
import { stats } from '../../../testing/mock-stats';

describe('StatsService', () => {
  let statsService: StatsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StatsService]
    });

    statsService = TestBed.get(StatsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get stats data', done => {
    statsService.get().subscribe(res => {
      expect(res.most_played_tracks[0].track.name).toEqual('Bound 2');
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/stats`
    );
    statsRequest.flush(stats);
    httpMock.verify();
  });
});

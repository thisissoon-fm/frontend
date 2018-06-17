import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PauseService } from './pause.service';
import { environment } from '../../../environments/environment';

describe('PauseService', () => {
  let pauseService: PauseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PauseService]
    });

    pauseService = TestBed.get(PauseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should send request to remove pause', done => {
    pauseService.delete().subscribe((res: any) => {
      expect(res.paused).toEqual(false);
      done();
    });

    const pauseRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/pause`
    );
    pauseRequest.flush({ paused: false });
    httpMock.verify();
  });

  it('should send request to add pause', done => {
    pauseService.post().subscribe((res: any) => {
      expect(res.paused).toEqual(true);
      done();
    });

    const pauseRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/pause`
    );
    pauseRequest.flush({ paused: true });
    httpMock.verify();
  });
});

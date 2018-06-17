import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { MuteService } from './mute.service';
import { environment } from '../../../environments/environment';
import { Mute } from '../models';

describe('MuteService', () => {
  let muteService: MuteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MuteService]
    });

    muteService = TestBed.get(MuteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get mute status', done => {
    muteService.get().subscribe((res: Mute) => {
      expect(res).toEqual({ mute: true });
      done();
    });

    const muteRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/mute`
    );
    muteRequest.flush({ mute: true });
    httpMock.verify();
  });

  it('should send request to remove mute', done => {
    muteService.delete().subscribe((res: any) => {
      expect(res.mute).toEqual(false);
      done();
    });

    const muteRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/mute`
    );
    muteRequest.flush({ mute: false });
    httpMock.verify();
  });

  it('should send request to add mute', done => {
    muteService.post().subscribe((res: any) => {
      expect(res.mute).toEqual(true);
      done();
    });

    const muteRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/mute`
    );
    muteRequest.flush({ mute: true });
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { VolumeService } from './volume.service';
import { environment } from '../../../environments/environment';

describe('VolumeService', () => {
  let volumeService: VolumeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VolumeService]
    });

    volumeService = TestBed.get(VolumeService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get volume data', done => {
    volumeService.get().subscribe(res => {
      expect(res.volume).toEqual(54);
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/volume`
    );
    statsRequest.flush({ volume: 54 });
    httpMock.verify();
  });

  it('should send request to change volume data', done => {
    volumeService.post({ volume: 70 }).subscribe(res => {
      expect(res.volume).toEqual(70);
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/volume`
    );
    statsRequest.flush({ volume: 70 });
    httpMock.verify();
  });
});

import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CurrentService } from './current.service';
import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';
import { queueItem } from '../../../testing/mock-queue-item';

describe('CurrentService', () => {
  let currentService: CurrentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrentService]
    });

    currentService = TestBed.get(CurrentService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get current item', done => {
    currentService.get().subscribe((res: QueueItem) => {
      expect(res).toEqual(queueItem);
      done();
    });

    const currentRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/current`
    );
    currentRequest.flush(queueItem);
    httpMock.verify();
  });

  it('should send request to delete current item', done => {
    currentService.delete().subscribe((res: any) => {
      expect(res.status).toEqual(200);
      done();
    });

    const currentRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/current`
    );
    currentRequest.flush({ status: 200 });
    httpMock.verify();
  });
});

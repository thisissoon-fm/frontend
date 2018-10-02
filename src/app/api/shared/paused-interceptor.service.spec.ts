import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';

import { PausedInterceptor } from './paused-interceptor.service';
import { environment } from '../../../environments/environment';
import { QueueItem } from '../models';
import { queueItem } from '../../../testing/mock-queue-item';

describe('PausedInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: PausedInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  it('should NOT get paused data from header', async(() => {
    http
      .get<QueueItem>(`${environment.apiUrlPlayer}some-other-url`)
      .subscribe(res => expect(res.paused).toBeFalsy());

    const request = httpMock.expectOne(
      `${environment.apiUrlPlayer}some-other-url`
    );
    const headers = new HttpHeaders();
    request.flush(queueItem, { headers });
    httpMock.verify();
  }));

  it('should get paused data from header', async(() => {
    http
      .get<QueueItem>(`${environment.apiUrlPlayer}player/current`)
      .subscribe(res => expect(res.paused).toBeFalsy());

    const request = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/current`
    );
    const headers = new HttpHeaders({ Paused: '0' });
    request.flush(queueItem, { headers });
    httpMock.verify();
  }));

  it('should get paused data from header', async(() => {
    http
      .get<QueueItem>(`${environment.apiUrlPlayer}player/current`)
      .subscribe(res => expect(res.paused).toBeTruthy());

    const request = httpMock.expectOne(
      `${environment.apiUrlPlayer}player/current`
    );
    const headers = new HttpHeaders({ Paused: '1' });
    request.flush(queueItem, { headers });
    httpMock.verify();
  }));
});

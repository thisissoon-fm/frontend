import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QueueService } from './queue.service';
import { environment } from '../../../environments/environment';
import { queueItem } from '../../../testing/mock-queue-item';

describe('QueueService', () => {
  let queueService: QueueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [QueueService]
    });

    queueService = TestBed.get(QueueService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get queue list', (done) => {
    queueService.query()
      .subscribe((res) => {
        expect(res.items[0]).toEqual(queueItem);
        done();
      });

    const queueRequest = httpMock.expectOne(`${environment.apiUrlPlayer}player/queue?limit=20`);
    queueRequest.flush([queueItem]);
    httpMock.verify();
  });

  it('should send request to add to queue', (done) => {
    queueService.post('foo')
      .subscribe((res) => {
        expect(res.status).toEqual(200);
        done();
      });

    const queueRequest = httpMock.expectOne(`${environment.apiUrlPlayer}player/queue`);
    queueRequest.flush({ status: 200 });
    httpMock.verify();
  });

  it('should send request to delete from queue', (done) => {
    queueService.delete('foo')
      .subscribe((res) => {
        expect(res.status).toEqual(200);
        done();
      });

    const queueRequest = httpMock.expectOne(`${environment.apiUrlPlayer}player/queue/foo`);
    queueRequest.flush({ status: 200 });
    httpMock.verify();
  });

  it('should get queue meta data', (done) => {
    queueService.getMeta()
      .subscribe((res) => {
        expect(res.play_time).toEqual(1000);
        done();
      });

    const queueRequest = httpMock.expectOne(`${environment.apiUrlPlayer}player/queue/meta`);
    queueRequest.flush({
      play_time: 1000,
      genres: { 'indie r&b': 1 },
      total: 1,
      users: { ['foo']: 1 }
    });
    httpMock.verify();
  });

});

import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { LocalStorageService } from '../shared/local-storage.service';

import { UserService } from './user.service';
import { environment } from '../../../environments/environment';
import { queueItem } from '../../../testing/mock-queue-item';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, LocalStorageService]
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should get user data', done => {
    userService.get('foo').subscribe(res => {
      expect(res.display_name).toEqual('Caroline Mascarin');
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}users/foo`
    );
    statsRequest.flush(queueItem.user);
    httpMock.verify();
  });

  it('should get current user data', done => {
    userService.me().subscribe(res => {
      expect(res.display_name).toEqual('Caroline Mascarin');
      done();
    });

    const statsRequest = httpMock.expectOne(
      `${environment.apiUrlPlayer}users/authenticated`
    );
    statsRequest.flush(queueItem.user);
    httpMock.verify();
  });

  it('should remove current user data', async(() => {
    const localStorageService = TestBed.get(LocalStorageService);
    const spy = spyOn(localStorageService, 'removeItem');
    userService.delete();
    expect(spy).toHaveBeenCalled();
  }));
});

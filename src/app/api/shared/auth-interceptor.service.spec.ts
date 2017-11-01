import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor.service';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../environments/environment';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LocalStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  it('should add auth header to request', async(() => {
    http.get<{status: number}>(`${environment.apiUrlPlayer}`)
      .subscribe(res => expect(res.status).toBeTruthy());

    const request = httpMock.expectOne(req => req.headers.has('Access-Token') && req.headers.get('Access-Token') === 'foo');
    request.flush({ status: 200 });
    httpMock.verify();
  }));

  it('should NOT add auth header to request', async(() => {
    http.get<{status: number}>('http://foo.com')
      .subscribe(res => expect(res.status).toBeTruthy());

    const request = httpMock.expectOne(req => !req.headers.has('Access-Token'));
    request.flush({ status: 200 });
    httpMock.verify();
  }));

});

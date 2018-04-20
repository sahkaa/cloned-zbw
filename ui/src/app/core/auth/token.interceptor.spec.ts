import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { TokenInterceptor } from '@app/core/auth/token.interceptor';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { mock } from 'ts-mockito';

describe('TokenInterceptor', () => {
  let auth: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: AuthenticationService, useFactory: () => mock(AuthenticationService)},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
      ]
    });
  }));

  beforeEach(() => {
    auth = getTestBed().get(AuthenticationService);
  });

  describe('intercept http calls', () => {
    const TEST_TOKEN: string = 'test-token';

    it('adds Authorization header', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {

        spyOn(auth, 'getCurrentToken').and.returnValue(TEST_TOKEN);
        http.get('/data').subscribe(response => {
            expect(response).toBeTruthy();
          }
        );
        const request: TestRequest = httpMock.expectOne(req =>
          req.headers.has('Authorization') &&
          req.headers.get('Authorization') === `Bearer ${TEST_TOKEN}`);
        expect(request.request.method).toEqual('GET');
        request.flush({});
        httpMock.verify();
      }));

    it('does not add Authorization header', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {

        spyOn(auth, 'getCurrentToken');
        http.get('/data').subscribe(response => {
            expect(response).toBeTruthy();
          }
        );
        const request: TestRequest = httpMock.expectOne(req =>
          !req.headers.has('Authorization'));
        expect(request.request.method).toEqual('GET');

        request.flush({});
        httpMock.verify();
      }));
  });
});

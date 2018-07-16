import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { TokenInterceptor } from '@app/core/interceptors/token.interceptor';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { mock } from 'ts-mockito';
import { of } from 'rxjs/observable/of';

describe('TokenInterceptor', () => {
  let autheticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, useFactory: () => mock(AuthenticationService) },
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });
  }));

  beforeEach(() => {
    autheticationService = getTestBed().get(AuthenticationService);
  });

  describe('intercept', () => {
    const TEST_TOKEN: string = 'test-token';

    it('should add Authorization header in the normal scenario', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne(req =>
        req.headers.has('Authorization') &&
        req.headers.get('Authorization') === `Bearer ${TEST_TOKEN}`);
      expect(request.request.method).toEqual('GET');
      request.flush({});
      httpMock.verify();
    }));

    it('should NOT add Authorization header for token request', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);

      http.get('http://localhost:8080/oauth/token').subscribe(response => {
        expect(response).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne(req => !req.headers.has('Authorization'));
      expect(request.request.method).toEqual('GET');
      request.flush({});
      httpMock.verify();
    }));

    it('should handle 400 errors and log out for invalid grants', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);
      spyOn(autheticationService, 'logout');

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      try {
        httpMock.expectOne('/data')
          .error(new ErrorEvent('400', { error: 'invalid_grant' }), { status: 400 });
        fail('It should raise an exception');
      } catch (ex) {
        expect(ex.status).toBe(400);
      }
      httpMock.verify();
      expect(autheticationService.logout).toHaveBeenCalled();
    }));

    it('should handle 400 errors and not to logout for NOT invalid grants', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);
      spyOn(autheticationService, 'logout');

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      try {
        httpMock.expectOne('/data')
          .error(new ErrorEvent('400'), { status: 400 });
        fail('It should raise an exception');
      } catch (ex) {
        expect(ex.status).toBe(400);
      }
      httpMock.verify();
      expect(autheticationService.logout).not.toHaveBeenCalled();
    }));

    it('should handle 500 errors', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      try {
        httpMock.expectOne('/data')
          .error(new ErrorEvent('500'), { status: 500 });
        fail('It should raise an exception');
      } catch (ex) {
        expect(ex.status).toBe(500);
      }
      httpMock.verify();
    }));

    it('should handle 401 errors, request a new token and repeat the request', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);
      spyOn(autheticationService, 'refreshToken').and.returnValue(of('other-token'));

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      httpMock.expectOne('/data').error(new ErrorEvent('401', { error: 'invalid_token' }), { status: 401 });
      const request: TestRequest = httpMock.expectOne(req =>
        req.headers.has('Authorization') &&
        req.headers.get('Authorization') === `Bearer other-token`);
      expect(request.request.method).toEqual('GET');
      httpMock.verify();
      expect(autheticationService.refreshToken).toHaveBeenCalled();
    }));

    it('should handle 401 errors with empty token and call logout', inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
      spyOn(autheticationService, 'getCurrentToken').and.returnValue(TEST_TOKEN);
      spyOn(autheticationService, 'refreshToken').and.returnValue(of(''));
      spyOn(autheticationService, 'logout');

      http.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      try {
        httpMock.expectOne('/data').error(new ErrorEvent('401', { error: 'invalid_token' }), { status: 401 });
      } catch (ex) {
      }
      httpMock.verify();
      expect(autheticationService.refreshToken).toHaveBeenCalled();
      expect(autheticationService.logout).toHaveBeenCalled();
    }));
  });
});

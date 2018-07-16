import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { ContentTypeInterceptor } from '@app/core/interceptors/content-type.interceptor';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { mock } from 'ts-mockito';

describe('ContentTypeInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true }
      ]
    });
  }));

  beforeEach(() => {
    httpMock = getTestBed().get(HttpTestingController);
    httpClient = getTestBed().get(HttpClient);
  });

  describe('intercept', () => {
    it('should add JSON content type', () => {
      httpClient.get('/data').subscribe(response => {
        expect(response).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne('/data');
      expect(request.request.method).toEqual('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      request.flush({});
      httpMock.verify();
    });

    it('should not change the existing content type', () => {
      const headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      httpClient.get('/data', { headers }).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne('/data');
      expect(request.request.method).toEqual('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      request.flush({});
      httpMock.verify();
    });
  });
});

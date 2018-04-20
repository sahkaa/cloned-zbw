import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core/core.module';
import { User } from '@app/core/models/user';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { StorageService } from '@app/core/services/storage.service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { instance, mock } from 'ts-mockito';

import { environment } from '../../../environments/environment';

describe('AuthenticationService', () => {
  let storageService: StorageService;
  let service: AuthenticationService;
  let httpMock: HttpTestingController;

  const CURRENT_USER_LOCAL_STORAGE: string = 'kayako-user';
  const CURRENT_ACCESS_TOKEN_LOCAL_STORAGE: string = 'kayako-access-token';
  const CURRENT_REFRESH_TOKEN_LOCAL_STORAGE: string = 'kayako-refresh-token';
  const CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE: string = 'kayako-login-expiration';
  const CURRENT_LOGIN_EXPIRATION_SESSION: string = 'session';
  const CURRENT_LOGIN_EXPIRATION_DAYS: number = 30;

  /* tslint:disable:no-any */
  const AUTH_TOKEN_RESPONSE: any = {
    access_token: CURRENT_ACCESS_TOKEN_LOCAL_STORAGE,
    refresh_token: CURRENT_REFRESH_TOKEN_LOCAL_STORAGE,
    expires_in: 1,
    scope: 'read',
    state: 'ok',
    token_type: 'bearer'
  };

  const mockUser: User = <User>{
    id: 1,
    username: 'test@test.com',
    firstName: 'John',
    lastName: 'Doe'
  };

  const URLs: { [string: string]: string } = {
    login: `${environment.serverPath}/oauth/token`,
    forgotPassword: `${environment.apiPath}/users/forgot-password`,
    resetPassword: `${environment.apiPath}/users/reset-password`,
    user: `${environment.apiPath}/users/current`,
    users: `${environment.apiPath}/data/users`
  };

  const headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa('kayakoapp:kayakosecret')
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthenticationService,
        {provide: StorageService, useValue: instance(mock(StorageService))},
        HttpClient
      ]
    });
  }));

  beforeEach(() => {
    storageService = getTestBed().get(StorageService);
    service = getTestBed().get(AuthenticationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should store data appropriately on a successful authentication / not remember option', () => {
      const spySet: jasmine.Spy = spyOn(storageService, 'setItem');

      service.login('sample', 'secret', false).subscribe((res) => {
        expect(res).toBe(mockUser);

        expect(storageService.setItem).toHaveBeenCalledTimes(4);
        expect(spySet.calls.argsFor(0))
          .toEqual([CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE, CURRENT_LOGIN_EXPIRATION_SESSION, true]);
        expect(spySet.calls.argsFor(1))
          .toEqual([CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, AUTH_TOKEN_RESPONSE.access_token, false]);
        expect(spySet.calls.argsFor(2))
          .toEqual([CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, AUTH_TOKEN_RESPONSE.refresh_token, false]);

      });

      const tokenRequest: TestRequest = httpMock.expectOne(`${URLs.login}`);
      tokenRequest.flush(AUTH_TOKEN_RESPONSE);

      const userRequest: TestRequest = httpMock.expectOne(`${URLs.user}`);
      userRequest.flush(mockUser);
    });

    it('should store data appropriately on a successful authentication / remember option', () => {
      const spySet: jasmine.Spy = spyOn(storageService, 'setItem');

      const expectedTime: Date = new Date();
      expectedTime.setDate(expectedTime.getDate() + CURRENT_LOGIN_EXPIRATION_DAYS);

      service.login('sample', 'secret', true).subscribe((res) => {
        expect(res).toBe(mockUser);

        expect(storageService.setItem).toHaveBeenCalledTimes(4);
        expect(spySet.calls.argsFor(0))
          .toEqual([CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE, expectedTime.toString(), true]);
        expect(spySet.calls.argsFor(1))
          .toEqual([CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, AUTH_TOKEN_RESPONSE.access_token, true]);
        expect(spySet.calls.argsFor(2))
          .toEqual([CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, AUTH_TOKEN_RESPONSE.refresh_token, true]);

      });

      const tokenRequest: TestRequest = httpMock.expectOne(`${URLs.login}`);
      tokenRequest.flush(AUTH_TOKEN_RESPONSE);

      const userRequest: TestRequest = httpMock.expectOne(`${URLs.user}`);
      userRequest.flush(mockUser);
    });
  });

  describe('getCurrentUser', () => {
    it('should not recover user when no login', () => {
      const user: User = service.getCurrentUser();
      expect(user).toBeUndefined();
    });

    it('should not have user after logout / no remember option', () => {
      spyOn(storageService, 'getItem').and.callFake(function (arg1: string, arg2: boolean): string {
        if (arg1 === CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE && arg2 === true) {
          return CURRENT_LOGIN_EXPIRATION_SESSION;
        } else {
          return JSON.stringify(mockUser);
        }
      });

      service.login('sample', 'secret', false).subscribe((res) => {
      });
      service.logout();

      const user: User = service.getCurrentUser();
      expect(user).toEqual(mockUser);
    });

    it('should not have user after logout / no remember option', () => {
      spyOn(storageService, 'getItem').and.callFake(function (arg1: string, arg2: boolean): string {
        if (arg1 === CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE && arg2 === true) {
          return CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE;
        }
      });

      service.login('sample', 'secret', false).subscribe((res) => {
      });
      service.logout();

      const user: User = service.getCurrentUser();
      expect(user).toBeUndefined();
    });

    it('is logged is false ', () => {
      const logged: boolean = service.isUserLogged();
      expect(logged).toBeFalsy();
    });
  });

  describe('isUserLogged', () => {
    it('is logged is false ', () => {
      const logged: boolean = service.isUserLogged();
      expect(logged).toBeFalsy();
    });

    it('user is logged', () => {
      spyOn(storageService, 'getItem').and.callFake(function (arg1: string, arg2: boolean): string {
        if (arg1 === CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE && arg2 === true) {
          return CURRENT_LOGIN_EXPIRATION_SESSION;
        } else {
          return JSON.stringify(mockUser);
        }
      });

      service.login('sample', 'secret', false).subscribe((res) => {
      });
      const logged: boolean = service.isUserLogged();
      expect(logged).toBeTruthy();
    });
  });

  describe('logout', () => {
    it('should clear the data on logout / not remember option', () => {
      service.login('sample', 'secret', false).subscribe((res) => {
        expect(res).toBeDefined();
        expect(res).toBe(mockUser);

        expect(localStorage.getItem(CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE)).toBeDefined();
        expect(sessionStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeDefined();
        expect(sessionStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeDefined();

        expect(localStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
        expect(localStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();
      });

      service.logout();
      expect(localStorage.getItem(CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE)).toBeNull();
      expect(sessionStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
      expect(sessionStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();

      expect(localStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
      expect(localStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();
    });

    it('should clear the data on logout / remember option', () => {

      service.login('sample', 'secret', true).subscribe((res) => {
        expect(res).toBeDefined();
        expect(res).toBe(mockUser);

        expect(localStorage.getItem(CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE)).toBeDefined();
        expect(localStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeDefined();
        expect(localStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeDefined();

        expect(sessionStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
        expect(sessionStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();
      });

      service.logout();
      expect(localStorage.getItem(CURRENT_LOGIN_EXPIRATION_LOCAL_STORAGE)).toBeNull();
      expect(sessionStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
      expect(sessionStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();

      expect(localStorage.getItem(CURRENT_USER_LOCAL_STORAGE)).toBeNull();
      expect(localStorage.getItem(CURRENT_ACCESS_TOKEN_LOCAL_STORAGE)).toBeNull();
    });
  });

  describe('forgotPassword', () => {
    it('should delegate to the endpoint', () => {
      const email: string = 'sample@example.org';
      service.forgotPassword(email).subscribe((res) => {
        expect(res).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne(`${URLs.forgotPassword}`);
      expect(request.request.body).toEqual(email);
      request.flush({});
    });
  });

  describe('resetPassword', () => {
    it('should delegate to the endpoint', () => {
      service.resetPassword('token', 'password').subscribe((res) => {
        expect(res).toBeTruthy();
      });

      const request: TestRequest = httpMock.expectOne(URLs.resetPassword);
      request.flush({});
    });
  });

  describe('isCreatePasswordTokenValid', () => {
    it('should not return a valid token response', () => {
      const http: HttpClient = instance(mock(HttpClient));
      const storage: StorageService = instance(mock(StorageService));
      const authService: AuthenticationService = new AuthenticationService(http, storage);
      spyOn(http, 'get').and.returnValue(_throw({status: 404}));
      authService.isCreatePasswordTokenValid('invalid-token').subscribe(
        (res) => {
          expect(false).toBeTruthy();
        }, (err) => {
          expect(true).toBeTruthy();
        });
    });

    it('should return an valid token response', () => {
      const http: HttpClient = instance(mock(HttpClient));
      const storage: StorageService = instance(mock(StorageService));
      const authService: AuthenticationService = new AuthenticationService(http, storage);
      spyOn(http, 'get').and.returnValue(of(null));
      authService.isCreatePasswordTokenValid('invalid-token').subscribe(
        (res) => {
          expect(true).toBeTruthy();
        }, (err) => {
          expect(false).toBeTruthy();
        });
    });
  });
});

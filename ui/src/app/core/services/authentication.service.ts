import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/core/models/user';
import { StorageService } from '@app/core/services/storage.service';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/do';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export const URLs: { [string: string]: string } = {
  get token(): string { return `${environment.serverPath}/oauth/token`; },
  get forgotPassword(): string { return  `${environment.apiPath}/users/forgot_password`; },
  get resetPassword(): string { return `${environment.apiPath}/users/reset_password`; },
  get user(): string { return `${environment.apiPath}/users/current`; },
  get users(): string { return `${environment.apiPath}/users`; },
  get resetPasswordToken(): string { return  `${environment.apiPath}/users/search/by_reset_password_token`; }
};

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  state?: string;
}

@Injectable()
export class AuthenticationService {

  private static CURRENT_USER_STORAGE_KEY: string = 'kayako-user';
  private static CURRENT_ACCESS_TOKEN_LOCAL_STORAGE: string = 'kayako-access-token';
  private static CURRENT_REFRESH_TOKEN_LOCAL_STORAGE: string = 'kayako-refresh-token';
  private static CURRENT_LOGIN_EXPIRATION_STORAGE_KEY: string = 'kayako-login-expiration';
  private static CURRENT_LOGIN_EXPIRATION_DAYS: number = 30;
  private static CURRENT_LOGIN_EXPIRATION_SESSION: string = 'session';
  private static BASIC_AUTH: string = 'Basic ' + btoa('zwbapp:zwbsecret');

  public constructor(private http: HttpClient,
                     private storageService: StorageService) {
  }

  /**
   * Perform a user authentication and store logged in user info in the local storage.
   *
   * @param {string} username   User's username
   * @param {string} password   User's password
   * @param {boolean} remember  Indicate if the login has to be remembered or not
   * @return {boolean}          True if login was successful
   */
  public login(username: string, password: string, remember: boolean): Observable<User> {
    const data: string = `username=${username}&password=${password}&grant_type=password&scope=read`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': AuthenticationService.BASIC_AUTH
    });
    return this.http.post<TokenResponse>(URLs.token, data, { headers: headers })
      .pipe(
        tap(responseToken => this.storeToken(remember, responseToken)),
        mergeMap(() => {
          return this.getUser()
            .pipe(tap(user => {
              this.storageService.setItem(AuthenticationService.CURRENT_USER_STORAGE_KEY, JSON.stringify(user), remember);
            }));
        })
      );
  }

  /**
   * Refresh the access token using the refresh token
   */
  public refreshToken(): Observable<string> {
    const storageType: boolean = this.getStorageType();
    const refreshToken: string = this.getCurrentRefreshToken();
    const data: string = `refresh_token=${refreshToken}&grant_type=refresh_token&scope=read`;
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': AuthenticationService.BASIC_AUTH
    });
    return this.http.post<TokenResponse>(URLs.token, data, { headers: headers })
      .pipe(
        map(responseToken => {
          this.storeToken(storageType, responseToken);
          return responseToken.access_token;
        })
      );
  }

  /**
   * Destroy current session and remove authentication local storage.
   */
  public logout(): void {
    // Remove user from storage to log user out
    this.storageService.removeItem(AuthenticationService.CURRENT_LOGIN_EXPIRATION_STORAGE_KEY, true);

    this.storageService.removeItem(AuthenticationService.CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, false);
    this.storageService.removeItem(AuthenticationService.CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, false);
    this.storageService.removeItem(AuthenticationService.CURRENT_USER_STORAGE_KEY, false);

    this.storageService.removeItem(AuthenticationService.CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, true);
    this.storageService.removeItem(AuthenticationService.CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, true);
    this.storageService.removeItem(AuthenticationService.CURRENT_USER_STORAGE_KEY, true);
  }

  public forgotPassword(email: string): Observable<HttpResponse<boolean>> {
    return this.http.patch<boolean>(URLs.forgotPassword, JSON.stringify({email}), {observe: 'response'});
  }

  // tslint:disable-next-line:no-any
  public resetPassword(token: string, password: string): Observable<HttpResponse<any>> {
    return this.http.patch(URLs.resetPassword, JSON.stringify({token, password}), {observe: 'response'});
  }

  public isUserLogged(): boolean {
    return !!this.getCurrentRefreshToken();
  }

  public getCurrentToken(): string {
    const storageType: boolean = this.getStorageType();
    if (storageType !== undefined) {
      return this.storageService.getItem(AuthenticationService.CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, storageType);
    } else {
      return undefined; // The user is not logged or login expired
    }
  }

  public getCurrentRefreshToken(): string {
    const storageType: boolean = this.getStorageType();
    if (storageType !== undefined) {
      return this.storageService.getItem(AuthenticationService.CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, storageType);
    } else {
      return undefined; // The user is not logged or login expired
    }
  }

  /**
   * Get current logged in user or undefined if nobody logged or login expired.
   *
   * @return {User} Current logged in user
   */
  public getCurrentUser(): User {
    const storageType: boolean = this.getStorageType();
    if (storageType !== undefined) {
      const data: string = this.storageService.getItem(AuthenticationService.CURRENT_USER_STORAGE_KEY, storageType);
      return JSON.parse(data);
    } else {
      return undefined; // The user is not logged or login expired
    }
  }

  /**
   * Get the token from the backend if not expired.
   */
  public isCreatePasswordTokenValid(token: string): Observable<Response> {
    return this.http.get<Response>(`${URLs.resetPasswordToken}?token=${token}`);
  }

  /**
   * Get the storage type to be used to get the data from (according to the login) or undefined if expired/not logged.
   *
   * @return {boolean} True if persistent storage has to be used, false if session storage or undefined if the login
   *  has expired or not user logged
   */
  private getStorageType(): boolean {
    const loginExpiration: string = this.storageService.getItem(AuthenticationService.CURRENT_LOGIN_EXPIRATION_STORAGE_KEY, true);
    if (loginExpiration) {
      if (loginExpiration === AuthenticationService.CURRENT_LOGIN_EXPIRATION_SESSION) {
        return false;
      } else {
        const currentTime: Date = new Date();
        const expiration: Date = new Date(loginExpiration);
        if (currentTime < expiration) {
          return true;
        }   // The login expired
      }
    }   // The user is not logged

    return undefined;
  }

  private storeToken(remember: boolean, responseToken: TokenResponse): void {
    if (remember) {
      const expiration: Date = new Date();
      expiration.setDate(expiration.getDate() + AuthenticationService.CURRENT_LOGIN_EXPIRATION_DAYS);
      this.storageService.setItem(AuthenticationService.CURRENT_LOGIN_EXPIRATION_STORAGE_KEY,
        expiration.toString(), true);
    } else {
      this.storageService.setItem(AuthenticationService.CURRENT_LOGIN_EXPIRATION_STORAGE_KEY,
        AuthenticationService.CURRENT_LOGIN_EXPIRATION_SESSION, true);
    }
    this.storageService.setItem(AuthenticationService.CURRENT_ACCESS_TOKEN_LOCAL_STORAGE, responseToken.access_token, remember);
    this.storageService.setItem(AuthenticationService.CURRENT_REFRESH_TOKEN_LOCAL_STORAGE, responseToken.refresh_token, remember);
  }

  private getUser(): Observable<User> {
    return this.http.get<User>(`${URLs.user}`);
  }
}

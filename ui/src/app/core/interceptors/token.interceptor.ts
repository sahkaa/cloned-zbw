import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '@app/core/services/authentication.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { _throw } from 'rxjs/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshingToken: boolean = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  public constructor(private authenticationService: AuthenticationService) {
  }

  // tslint:disable-next-line:no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request, this.authenticationService.getCurrentToken())).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              if (error.error && error.error.error === 'invalid_token') {
                return this.handle401InvalidTokenError(request, next);
              }
          }
        }

        return _throw(error);
      })
    );
  }

  // tslint:disable-next-line:no-any
  private handle400Error(errorResponse: any): Observable<HttpEvent<any>> {
    if (errorResponse && errorResponse.error && errorResponse.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      this.logout('The token is no longer valid so logout');
    }

    return _throw(errorResponse);
  }

  // tslint:disable-next-line:no-any
  private handle401InvalidTokenError(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return this.authenticationService.refreshToken().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
              this.tokenSubject.next(newToken);
              return next.handle(this.addToken(request, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return this.logout('It was not possible to get a token');
        }),
        catchError(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return this.logout('There was an error refreshing the token.');
        }),
        tap(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }

  // tslint:disable-next-line:no-any
  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    // We do not add the token to the token request call
    if (request.url !== URLs.token) {
      return request.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
    } else {
      return request;
    }
  }

  private logout(error: string): ErrorObservable {
    this.authenticationService.logout();
    return _throw(error);
  }
}

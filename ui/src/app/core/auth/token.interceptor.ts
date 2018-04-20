import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public constructor(public authenticationService: AuthenticationService) {
  }

  /* tslint:disable:no-any */
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authenticationService.getCurrentToken();
    if (!!token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    if (isNullOrUndefined(request.headers.get('Content-Type'))) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}

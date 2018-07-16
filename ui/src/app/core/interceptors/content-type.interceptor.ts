import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isNullOrUndefined } from 'util';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  public constructor() {}

  // tslint:disable-next-line:no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  public constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authenticationService.isUserLogged()) {
      this.router.navigateByUrl('/login');
    } else {
      return true;
    }
  }

}

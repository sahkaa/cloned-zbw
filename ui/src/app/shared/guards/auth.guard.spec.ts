import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { mock } from 'ts-mockito/lib/ts-mockito';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const authenticationService: AuthenticationService = mock(AuthenticationService);
  const router: Router = mock(Router);
  const guard: AuthGuard = new AuthGuard(authenticationService, router);

  it('should navigate to login when not logged', () => {
    spyOn(router, 'navigateByUrl');
    spyOn(authenticationService, 'isUserLogged').and.returnValue(false);

    guard.canActivate(mock(ActivatedRouteSnapshot), mock(RouterStateSnapshot));

    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return true when logged', () => {
    spyOn(authenticationService, 'isUserLogged').and.returnValue(true);

    const result: Observable<boolean> | Promise<boolean> | boolean =
      guard.canActivate(mock(ActivatedRouteSnapshot), mock(RouterStateSnapshot));

    expect(result).toBeTruthy();
  });
});

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Observable } from 'rxjs/Observable';
import { mock } from 'ts-mockito/lib/ts-mockito';

import { CreatePasswordPageComponent } from './create-password-page.component';
import Spy = jasmine.Spy;

describe('CreatePasswordPageComponent', () => {
  let component: CreatePasswordPageComponent;
  let fixture: ComponentFixture<CreatePasswordPageComponent>;
  let authenticationService: AuthenticationService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CreatePasswordPageComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthenticationService, useFactory: () => mock(AuthenticationService) },
        { provide: ActivatedRoute, useFactory: () => mock(ActivatedRoute) },
        { provide: Router, useFactory: () => mock(Router) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePasswordPageComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    activatedRoute = TestBed.get(ActivatedRoute);
    router = TestBed.get(Router);

    activatedRoute.params = Observable.create(observer => {
      observer.next({ 'token': 'token' });
      observer.complete();
    });
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized as expected', () => {
    expect(component.length).toBeFalsy();
    expect(component.uppercase).toBeFalsy();
    expect(component.special).toBeFalsy();
    expect(component.number).toBeFalsy();
    expect(component.loading).toBeFalsy();
    expect(component.isDisabled).toBeTruthy();
  });

  it('should create the form on ngOnInit with a valid token', () => {
    spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));
    component.ngOnInit();
    expect(component.form).toBeDefined();
  });

  it('should redirect to error page on ngOnInit', () => {
    spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(_throw({status: 404}));
    spyOn(router, 'navigateByUrl');
    component.ngOnInit();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/create-password/error');
  });

  describe('isDisabled', () => {
    it('should return true for isDisabled on invalid password', () => {
      spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));
      component.ngOnInit();
      component.form.setValue({ password: 'test' });
      expect(component.isDisabled).toBeTruthy();
    });

    it('should return false for isDisabled on valid password', () => {
      spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));
      component.ngOnInit();
      component.form.setValue({ password: '12!@qwQW' });
      expect(component.isDisabled).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    it('should call the service with the right arguments and route to success', () => {
      spyOn(authenticationService, 'resetPassword').and.returnValue(of(true));
      const spy: Spy = spyOn(router, 'navigateByUrl');
      spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));
      component.ngOnInit();
      component.form.setValue({ password: 'password' });
      component.length = true;
      component.special = true;
      component.uppercase = true;
      component.number = true;
      component.onSubmit();

      expect(authenticationService.resetPassword).toHaveBeenCalledWith('token', 'password');
      expect(spy.calls.mostRecent().args[0]).toEqual('/create-password/success');
    });

    it('should handle authenticationService.resetPassword error for api errors', () => {
      spyOn(authenticationService, 'resetPassword').and
        .returnValue(_throw({
          error: {
            message: 'Sample error text'
          }
        }));
      const spy: Spy = spyOn(router, 'navigateByUrl');
      spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));

      component.ngOnInit();
      component.form.setValue({ password: 'password' });
      component.length = true;
      component.special = true;
      component.uppercase = true;
      component.number = true;

      component.onSubmit();

      expect(authenticationService.resetPassword).toHaveBeenCalledWith('token', 'password');
      expect(spy.calls.mostRecent().args[0]).toEqual('/create-password/error');
    });

    it('should handle not submit the form due to validation', () => {
      spyOn(authenticationService, 'resetPassword').and
        .returnValue(_throw({
          error: {
            message: 'Sample error text'
          }
        }));
      const spy: Spy = spyOn(router, 'navigateByUrl');
      spyOn(authenticationService, 'isCreatePasswordTokenValid').and.returnValue(of({status: 200}));
      component.ngOnInit();
      component.form.setValue({ password: 'password' });
      component.length = false;
      component.special = true;
      component.uppercase = true;
      component.number = true;

      component.onSubmit();

      expect(authenticationService.resetPassword).not.toHaveBeenCalled();
    });

  });
});

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { mock } from 'ts-mockito/lib/ts-mockito';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginPageComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: '', component: Component }
        ])
      ],
      providers: [
        { provide: AuthenticationService, useFactory: () => mock(AuthenticationService) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should get the dependencies', () => {
    expect(authenticationService).toBeDefined();
  });

  it('should be initialized as expected', () => {
    expect(component.alert.show).toBeFalsy();
    expect(component.alert.message).toBe('');
    expect(component.loading).toBeFalsy();
  });

  describe('ngOnInit', () => {
    it('should create the form on ngOnInit', () => {
      component.ngOnInit();

      expect(component.form).toBeDefined();
    });
  });

  describe('isDisabled', () => {
    it('should return true for isDisabled on empty fields', () => {
      component.ngOnInit();

      expect(component.isDisabled).toBeTruthy();
    });

    it('should return true for isDisabled on non-valid emails', () => {
      component.ngOnInit();

      component.form.setValue({ email: 'admin', password: 'sample', remember: false });

      expect(component.isDisabled).toBeTruthy();
    });

    it('should return false for isDisabled on valid login', () => {
      component.ngOnInit();

      component.form.setValue({ email: 'sample@example.org', password: 'sample', remember: false });

      expect(component.isDisabled).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    it('should call the service with the right arguments and navigate to home', () => {
      spyOn(router, 'navigateByUrl');
      spyOn(authenticationService, 'login').and.returnValue(of(false));
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org', password: 'sample', remember: false });

      component.onSubmit();

      expect(authenticationService.login).toHaveBeenCalledWith('sample@example.org', 'sample', false);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
      expect(component.loading).toBeFalsy();
    });

    it('should handle authenticationService.login error for api errors', () => {
      spyOn(authenticationService, 'login').and
        .returnValue(_throw({
          error: {
            error_description: 'Sample error text'
          }
        }));
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org', password: 'sample', remember: false });

      component.onSubmit();

      expect(authenticationService.login).toHaveBeenCalledWith('sample@example.org', 'sample', false);
      expect(component.alert.show).toBeTruthy();
      expect(component.alert.message).toBe('Sample error text');
      expect(component.loading).toBeFalsy();
    });
  });

  describe('onEmailBlur', () => {
    it('should set an error on invalid emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: 'sample', password: 'sample', remember: false });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toEqual(
        { invalidEmail: 'Please provide a valid email' }
      );
    });

    it('should not set erros on valid emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org', password: 'sample', remember: false });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toBeNull();
    });

    it('should not set erros on empty emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: '', password: 'sample', remember: false });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toBeNull();
    });
  });

});

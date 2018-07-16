import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { mock } from 'ts-mockito/lib/ts-mockito';

import { ForgotPasswordPageComponent } from './forgot-password-page.component';

describe('ForgotPasswordPageComponent', () => {
  let component: ForgotPasswordPageComponent;
  let fixture: ComponentFixture<ForgotPasswordPageComponent>;
  let authenticationService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ForgotPasswordPageComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthenticationService, useFactory: () => mock(AuthenticationService) }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPageComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be initialized as expected', () => {
    expect(component.alert.show).toBeFalsy();
    expect(component.alert.error).toBeFalsy();
    expect(component.alert.message).toBe('');
    expect(component.loading).toBeFalsy();
  });

  it('should create the form on ngOnInit', () => {
    component.ngOnInit();

    expect(component.form).toBeDefined();
  });

  describe('isDisabled', () => {
    it('should return true for isDisabled on empty fields', () => {
      component.ngOnInit();

      expect(component.isDisabled).toBeTruthy();
    });

    it('should return true for isDisabled on non-valid emails', () => {
      component.ngOnInit();

      component.form.setValue({ email: 'admin' });

      expect(component.isDisabled).toBeTruthy();
    });

    it('should return false for isDisabled on valid login', () => {
      component.ngOnInit();

      component.form.setValue({ email: 'sample@example.org' });

      expect(component.isDisabled).toBeFalsy();
    });
  });

  describe('onSubmit', () => {
    it('should call the service with the right arguments and display the alert', () => {
      spyOn(authenticationService, 'forgotPassword').and.returnValue(of(false));
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org' });

      component.onSubmit();

      expect(authenticationService.forgotPassword).toHaveBeenCalledWith('sample@example.org');
      expect(component.alert.show).toBeTruthy();
      expect(component.alert.error).toBeFalsy();
      expect(component.alert.message).toBe('An email with a reset link has been sent to your inbox');
      expect(component.loading).toBeFalsy();
    });

    it('should handle authenticationService.forgotPassword error for api errors', () => {
      spyOn(authenticationService, 'forgotPassword').and
        .returnValue(_throw({
          error: {
            message: 'Sample error text'
          }
        }));
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org' });

      component.onSubmit();

      expect(authenticationService.forgotPassword).toHaveBeenCalledWith('sample@example.org');
      expect(component.alert.show).toBeTruthy();
      expect(component.alert.error).toBeTruthy();
      expect(component.alert.message).toBe('Sample error text');
      expect(component.loading).toBeFalsy();
    });
  });

  describe('onEmailBlur', () => {
    it('should set an error on invalid emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: 'sample' });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toEqual(
        { invalidEmail: 'Please provide a valid email' }
      );
    });

    it('should not set erros on valid emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: 'sample@example.org' });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toBeNull();
    });

    it('should not set erros on empty emails', () => {
      component.ngOnInit();
      component.form.setValue({ email: '' });

      component.onEmailBlur();

      expect(component.form.controls.email.errors).toBeNull();
    });
  });
});

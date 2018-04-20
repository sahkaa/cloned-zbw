import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { EmailUtilities } from '@app/shared/utilities/email-utilities';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, AfterViewInit {

  public form: FormGroup;
  public alert: { show: boolean, message: string } = { show: false, message: '' };
  public loading: boolean = false;

  @ViewChild('email') public email: ElementRef;

  @HostBinding('class') public class: string = 'col p-0 d-flex justify-content-center align-items-center';

  public constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.email.nativeElement.focus());
  }

  public get isDisabled(): boolean {
    if (this.form.value.email === '' || this.form.value.password === '') {
      return true;
    }

    if (!EmailUtilities.EMAIL_VALIDATION_PATTERN.test(this.form.value.email)) {
      return true;
    }

    return false;
  }

  public onSubmit(): void {
    this.alert.show = false;
    this.loading = true;
    this.form.get('email').setErrors(null);
    this.form.get('password').setErrors(null);
    this.authenticationService.login(this.form.value.email, this.form.value.password, this.form.value.remember)
      .subscribe(response => {
        this.router.navigateByUrl('/');
        this.loading = false;
      }, errorResponse => {
        // The Authentication API has it's own error response format
        if (errorResponse.status === 0) {
          this.alert = { show: true, message: 'There was an error when communicating with the backend.' };
        } else {
          this.alert = { show: true, message: errorResponse.error.error_description };
        }
        this.loading = false;
      });
  }

  public onEmailBlur(): void {
    if (this.form.value.email === '') {
      return;
    }

    if (!EmailUtilities.EMAIL_VALIDATION_PATTERN.test(this.form.value.email)) {
      this.form.get('email').setErrors({invalidEmail: 'Please provide a valid email'});
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
      remember: ''
    });
  }
}

import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { EmailUtilities } from '@app/shared/utilities/email-utilities';
import { ErrorMessageHandler } from '@app/shared/utilities/error-message-handler';
import { DfValidationMessagesMap } from '@devfactory/ngx-df/validation-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  public alert: { show: boolean, error: boolean, message: string } = { show: false, error: false, message: '' };
  public loading: boolean = false;
  public emailError: DfValidationMessagesMap = {
    required: () => 'This field is required',
    pattern: () => 'Please enter a valid email'
  };

  @ViewChild('email') public email: ElementRef;

  @HostBinding('class') public class: string = 'col p-0 d-flex justify-content-center align-items-center';

  public constructor(
    private fb: FormBuilder,
    private service: AuthenticationService
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.email.nativeElement.focus());
  }

  public get isDisabled(): boolean {
    if (this.form.value.email === '') {
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
    this.service.forgotPassword(this.form.value.email).subscribe(response => {
      this.alert = { show: true, error: false, message: 'An email with a reset link has been sent to your inbox' };
      this.loading = false;
    }, error => {
      this.alert = { show: true, error: true, message: ErrorMessageHandler.getErrorMessage(error) };
      this.loading = false;
    });
  }

  public onEmailBlur(): void {
    if (this.form.value.email === '') {
      return;
    }

    if (!EmailUtilities.EMAIL_VALIDATION_PATTERN.test(this.form.value.email)) {
      this.form.get('email').setErrors({ invalidEmail: 'Please provide a valid email' });
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      email: ''
    });
  }
}

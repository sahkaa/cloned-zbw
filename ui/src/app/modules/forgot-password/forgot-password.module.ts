import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';

@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule
  ],
  declarations: [
    ForgotPasswordPageComponent
  ]
})
export class ForgotPasswordModule { }

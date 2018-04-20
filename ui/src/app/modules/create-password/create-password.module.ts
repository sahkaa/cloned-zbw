import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordPageComponent } from './pages/create-password-page/create-password-page.component';
import { CreatePasswordResultPageComponent } from './pages/create-password-result-page/create-password-result-page.component';

@NgModule({
  imports: [
    CommonModule,
    CreatePasswordRoutingModule,
    SharedModule
  ],
  declarations: [
    CreatePasswordPageComponent,
    CreatePasswordResultPageComponent
  ]
})
export class CreatePasswordModule { }

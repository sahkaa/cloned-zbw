import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './pages/shell/shell.component';
import { ShellRoutingModule } from './shell-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ShellRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule
  ],
  declarations: [
    ShellComponent
  ]
})
export class ShellModule { }

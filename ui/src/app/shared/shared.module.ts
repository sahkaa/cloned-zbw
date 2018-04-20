import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CopyRightComponent } from './components/copy-right/copy-right.component';
import { LogoComponent } from './components/logo/logo.component';
import { NgxDfCustom } from './ngx-custom.module';

// tslint:disable-next-line
const SHARED_MODULES: any[] = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgxDfCustom
];

// tslint:disable-next-line
const SHARED_COMPONENTS: any[] = [
  LogoComponent,
  CopyRightComponent
];

/**
 * The shared module is used to hold all reusable components across the app's
 * different modules. It imports and exports reusable modules to make them
 * readily available to other feature modules just by importing the shared
 * module, avoiding repetition. Since the shared module is meant to be imported
 * by all feature-modules, it shouldn't provide any service.
 */
@NgModule({
  imports: SHARED_MODULES,
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS
  ],
  declarations: [
    ...SHARED_COMPONENTS
    /** Add components here if necessary */
  ]
  /** Do not provide services here, do it in core.module */
})
export class SharedModule {}

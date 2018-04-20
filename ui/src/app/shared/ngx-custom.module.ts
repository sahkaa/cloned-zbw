import { ModuleWithProviders, NgModule } from '@angular/core';
import { DfBadgeModule } from '@devfactory/ngx-df/badge';
import { DfButtonModule } from '@devfactory/ngx-df/button';
import { DfCardModule } from '@devfactory/ngx-df/card';
import { DfCheckboxModule } from '@devfactory/ngx-df/checkbox';
import { DfInputModule } from '@devfactory/ngx-df/input';
import { DfLabelModule } from '@devfactory/ngx-df/label';
import { DfLoadingSpinnerModule, DfLoadingSpinnerTypes } from '@devfactory/ngx-df/loading-spinner';
import { DfModalModule } from '@devfactory/ngx-df/modal';
import { DfPortalModule } from '@devfactory/ngx-df/portal';
import { DfProtoToolbarModule } from '@devfactory/ngx-df/proto-toolbar';
import { DfSidebarModule } from '@devfactory/ngx-df/sidebar';
import { DfSketchModeModule } from '@devfactory/ngx-df/sketch-mode';
import { DfToasterModule } from '@devfactory/ngx-df/toaster';
import { DfTopbarModule } from '@devfactory/ngx-df/topbar';
import { DfUserProfileModule } from '@devfactory/ngx-df/user-profile';
import { DfValidationMessagesModule } from '@devfactory/ngx-df/validation-messages';
import { DfWhatsNewModule } from '@devfactory/ngx-df/whats-new';

// tslint:disable-next-line
const NGX_DF_MODULES: any[] = [
  DfCardModule,
  DfTopbarModule,
  DfSidebarModule,
  DfUserProfileModule,
  DfSketchModeModule,
  DfLabelModule,
  DfButtonModule,
  DfWhatsNewModule,
  DfProtoToolbarModule,
  DfLoadingSpinnerModule,
  DfInputModule,
  DfCheckboxModule,
  DfToasterModule,
  DfValidationMessagesModule,
  DfBadgeModule,
  DfPortalModule,
  DfModalModule
];

@NgModule({
  imports: [
    DfCardModule.forRoot(),
    DfTopbarModule.forRoot(),
    DfSidebarModule.forRoot(),
    DfUserProfileModule.forRoot(),
    DfSketchModeModule.forRoot(),
    DfLabelModule.forRoot(),
    DfButtonModule.forRoot(),
    DfWhatsNewModule.forRoot(),
    DfProtoToolbarModule.forRoot(),
    DfLoadingSpinnerModule.forRoot({
      type: DfLoadingSpinnerTypes.SLIM
    }),
    DfInputModule.forRoot(),
    DfCheckboxModule.forRoot(),
    DfToasterModule.forRoot(),
    DfValidationMessagesModule.forRoot(),
    DfBadgeModule.forRoot(),
    DfPortalModule.forRoot(),
    DfModalModule.forRoot()
  ],
  exports: NGX_DF_MODULES
})
export class NgxDfRootModule {}

@NgModule({
  imports: NGX_DF_MODULES,
  exports: NGX_DF_MODULES
})
export class NgxDfCustom {


  public static forRoot(): ModuleWithProviders {
    return {ngModule: NgxDfRootModule};
  }
}

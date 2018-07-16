import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadChildren: 'app/modules/login/login.module#LoginModule'},
  {path: 'forgot-password', loadChildren: 'app/modules/forgot-password/forgot-password.module#ForgotPasswordModule'},
  {path: 'create-password', loadChildren: 'app/modules/create-password/create-password.module#CreatePasswordModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

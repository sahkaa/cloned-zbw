import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatePasswordPageComponent } from './pages/create-password-page/create-password-page.component';
import { CreatePasswordResultPageComponent } from './pages/create-password-result-page/create-password-result-page.component';

const routes: Routes = [
  {path: 'error', component: CreatePasswordResultPageComponent, data: {result: 'error'}},
  {path: 'success', component: CreatePasswordResultPageComponent, data: {result: 'success'}},
  {path: ':token', component: CreatePasswordPageComponent},
  {path: '', component: CreatePasswordPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatePasswordRoutingModule { }

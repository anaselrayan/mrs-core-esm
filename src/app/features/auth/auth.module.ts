import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' as const,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    LoginComponent,
  ],
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: '',
    loadComponent: () => import('./patient-list/patient-list.component').then(m => m.PatientListComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./patient-registration/patient-registration.component').then(m => m.PatientRegistrationComponent),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class PatientsModule { }


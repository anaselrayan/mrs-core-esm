import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Patients
        </h1>
        <app-button
          variant="primary"
          (onClick)="navigateToRegistration()"
        >
          Add New Patient
        </app-button>
      </div>

      <app-card>
        <div class="text-center py-12">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Patient Management
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            This feature is under development. You'll be able to view and manage patients here.
          </p>
          <app-button
            variant="outline"
            (onClick)="navigateToRegistration()"
          >
            Register New Patient
          </app-button>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PatientListComponent {
  navigateToRegistration(): void {
    // This would navigate to patient registration
    console.log('Navigate to patient registration');
  }
}

